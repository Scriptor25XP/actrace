import { VercelKV, createClient } from "@vercel/kv";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import "server-only";

interface Reference<T> {
    get: () => T,
    set: (value: T) => void
}

type Get<T> = <K extends keyof T>(key: K) => T[K];
type Set<T> = <K extends keyof T>(key: K, value: T[K]) => void;

class RowReference<T> {

    constructor(
        readonly exists: () => boolean,
        readonly remove: () => boolean,
        private readonly get: Get<T>,
        private readonly set: Set<T>,
    ) {
    }

    ref<K extends keyof T>(key: K): Reference<T[K]> {
        return {
            get: () => this.get<K>(key),
            set: value => this.set<K>(key, value),
        };
    }
}

class Storage<T> {

    static async open<S extends Storage<T>, T>(key: string, callback: (storage: Storage<T>) => Promise<void>, ctor: new (key: string) => S) {
        const storage = new ctor(key);
        await storage.load();
        await callback(storage);
        await storage.store();
    }

    protected readonly values: T[] = [];

    protected constructor(protected readonly key: string) {
    }

    protected async load(): Promise<void> { }
    protected async store(): Promise<void> { }

    row(index: number): RowReference<T> {
        const inbounds = 0 <= index && index < this.values.length;

        let exists = inbounds;

        return new RowReference<T>(
            () => exists,
            () => {
                if (exists) {
                    this.values.splice(index, 1);
                    exists = false;
                    return true;
                }
                return false;
            },
            (key) => {
                if (exists) {
                    return this.values[index][key];
                }
                throw new Error("row does not exits");
            },
            (key, value) => {
                if (exists) {
                    this.values[index][key] = value;
                    return;
                }
                throw new Error("row does not exits");
            });
    }

    insert(value: T): RowReference<T> {
        const len = this.values.push(value);
        return this.row(len - 1);
    }
}

class JsonStorage<T> extends Storage<T> {

    private get filename() { return path.join(process.cwd(), `${this.key}.storage.json`); }

    constructor(key: string) {
        super(key);
    }

    async load(): Promise<void> {
        if (existsSync(this.filename)) {
            const json = readFileSync(this.filename, "utf-8");
            this.values.splice(0, this.values.length, ...JSON.parse(json));
        }
    }

    async store(): Promise<void> {
        const json = JSON.stringify(this.values, undefined, 2);
        writeFileSync(this.filename, json);
    }
}

class KVStorage<T> extends Storage<T> {

    private readonly client: VercelKV;

    constructor(key: string) {
        super(key);

        this.client = createClient({
            url: process.env.KV_REST_API_URL,
            token: process.env.KV_REST_API_TOKEN,
        });
    }

    async load(): Promise<void> {
        const data = await this.client.get<T[]>(this.key);
        if (data !== null) {
            this.values.splice(0, this.values.length, ...data);
        }
    }

    async store(): Promise<void> {
        await this.client.set(this.key, this.values);
    }
}

export async function storage<T>(service: "json" | "kv", key: string, callback: (storage: Storage<T>) => Promise<void>) {
    switch (service) {
        case "json":
            await Storage.open(key, callback, JsonStorage);
            break;
        case "kv":
            await Storage.open(key, callback, KVStorage);
            break;
    }
}
