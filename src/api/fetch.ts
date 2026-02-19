import "server-only";

import { getRefreshToken } from "@/api/oauth";

import { getBundleCookies, setBundleCookies } from "@/util/cookies";

export async function fetchAPI(resource: string, init?: RequestInit) {
    let bundle = await getBundleCookies();

    if (bundle) {
        if (bundle.expires_at * 1000 <= Date.now()) {
            bundle = await getRefreshToken(bundle.refresh_token);
            await setBundleCookies(bundle);
        }

        init = {
            ...init,
            headers: {
                ...init?.headers,
                "Authorization": `Bearer ${bundle.access_token}`,
            },
        };
    }

    const response = await fetch(`${process.env.API_ENDPOINT}/${resource}`, init);

    if (!response.ok) {
        const json = await response.json();

        console.error(`failed to fetch api resource ${resource}: ${response.status} - ${response.statusText}`);
        console.error(json);

        throw new Error(`failed to fetch api resource ${resource}: ${response.status} - ${response.statusText}: ${JSON.stringify(json, undefined, 2)}`, { cause: response });
    }

    return response;
}

export async function fetchEntity<T>(resource: string, init?: RequestInit): Promise<T | null> {
    try {
        const response = await fetchAPI(resource, init);
        return response.json();
    } catch {
        return null;
    }
}
