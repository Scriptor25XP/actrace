import "server-only";
import {cookies} from "next/headers";

export type OAuthTokenBundle = {
    access_token: string,
    expires_at: number,
    expires_in: number,
    refresh_token: string,
}

export async function getBundleCookies(): Promise<OAuthTokenBundle | undefined> {
    const storage = await cookies();

    if (storage.has("access_token")
        && storage.has("expires_at")
        && storage.has("expires_in")
        && storage.has("refresh_token")) {

        if (Number.parseInt(storage.get("expires_at")!.value) * 1000 <= Date.now())
            return undefined;

        return {
            access_token: storage.get("access_token")!.value,
            expires_at: Number.parseInt(storage.get("expires_at")!.value),
            expires_in: Number.parseInt(storage.get("expires_in")!.value),
            refresh_token: storage.get("refresh_token")!.value,
        };
    }

    return undefined;
}

export async function setBundleCookies({access_token, expires_at, expires_in, refresh_token}: OAuthTokenBundle) {
    const storage = await cookies();

    storage.set("access_token", access_token, {expires: expires_at * 1000});
    storage.set("expires_at", expires_at.toString());
    storage.set("expires_in", expires_in.toString());

    if (storage.get("refresh_token")?.value !== refresh_token) {
        storage.set("refresh_token", refresh_token, {maxAge: 3600 * 6});
    }
}

export async function clearBundleCookies() {
    const storage = await cookies();

    storage.delete("access_token");
    storage.delete("expires_at");
    storage.delete("expires_in");
    storage.delete("refresh_token");
}
