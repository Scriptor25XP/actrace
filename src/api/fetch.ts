import { getRefreshToken } from "@/api/oauth";
import { OAuthTokenBundle, setBundleCookies } from "@/util/cookies";
import "server-only";

export async function fetchAPI(resource: string, init?: RequestInit) {
    const response = await fetch(`${process.env.API_ENDPOINT}/${resource}`, init);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`failed to fetch api resource ${resource}: ${response.status} - ${response.statusText}\n${text}`);
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
