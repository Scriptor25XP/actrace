import { getRefreshToken } from "@/api/oauth";
import { OAuthTokenBundle, setBundleCookies } from "@/util/cookies";
import "server-only";

export class FetchError extends Error {
    response: Response;
    text: string;
    json: unknown;

    constructor(message: string, response: Response, text: string, json: unknown) {
        super(message);
        this.response = response;
        this.text = text;
        this.json = json;
    }
}

export async function fetchAPI(resource: string, init?: RequestInit) {
    const response = await fetch(`${process.env.API_ENDPOINT}/${resource}`, init);

    if (!response.ok) {
        const text = await response.text();
        let json: unknown;
        try {
            json = JSON.parse(text);
        } catch {
        }

        console.error(`failed to fetch api resource ${resource}: ${response.status} - ${response.statusText}`);
        console.error(json);

        throw new FetchError(
            `failed to fetch api resource ${resource}: ${response.status} - ${response.statusText}`,
            response,
            text,
            json);
    }

    return response;
}

export async function fetchRestrictedAPI(resource: string, bundle: OAuthTokenBundle, init?: RequestInit) {

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

    return await fetchAPI(resource, init);
}
