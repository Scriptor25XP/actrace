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

    static async open<T>(key: string, callback: (storage: Storage<T>) => Promise<void>) {
        const storage = new Storage<T>(key);
        await callback(storage);
        storage.sync();
    }

    private readonly values: T[];

    constructor(private readonly key: string) {
        this.values = [];
        if (existsSync(this.filename)) {
            const json = readFileSync(this.filename, "utf-8");
            this.values = JSON.parse(json);
        }
    }

    private get filename() { return path.join(process.cwd(), `${this.key}.storage.json`); }

    private sync() {
        const json = JSON.stringify(this.values, null, 2);
        writeFileSync(this.filename, json);
    }

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

export async function storage<T>(key: string, callback: (storage: Storage<T>) => Promise<void>) {
    await Storage.open<T>(key, callback);
}
