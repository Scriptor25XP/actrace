import "server-only";
import {fetchAPI} from "@/api/fetch";
import {DetailedAthlete} from "@/type/strava";
import {clearBundleCookies, OAuthTokenBundle} from "@/util/cookies";

export type OAuthScope =
    "read"
    | "read_all"
    | "profile:read_all"
    | "profile:write"
    | "activity:read"
    | "activity:read_all"
    | "activity:write";

export type OAuthResponse = OAuthTokenBundle & {
    token_type: string,
    athlete?: DetailedAthlete,
}

type OptionalParams = {
    approvalPrompt?: boolean,
    state?: string,
}

export async function getOAuthURI(scope: OAuthScope[], optional?: OptionalParams) {
    const params = new URLSearchParams();
    params.set("client_id", process.env.CLIENT_ID!);
    params.set("redirect_uri", `${process.env.BASE_URI!}/api/oauth`);
    params.set("response_type", "code");
    params.set("scope", scope.join(","));
    if (optional?.approvalPrompt)
        params.set("approval_prompt", optional.approvalPrompt ? "force" : "auto");
    if (optional?.state)
        params.set("state", optional.state);

    return `${process.env.OAUTH_ENDPOINT}/authorize?${params}`;
}

export async function deauthorizeOAuth(accessToken: string) {
    const params = new URLSearchParams();
    params.set("access_token", accessToken);

    await fetch(`${process.env.OAUTH_ENDPOINT}/deauthorize?${params}`, {method: "POST"});
    await clearBundleCookies();
}

export async function getOAuthToken(code: string): Promise<OAuthResponse> {
    const params = new URLSearchParams();
    params.set("client_id", process.env.CLIENT_ID!);
    params.set("client_secret", process.env.CLIENT_SECRET!);
    params.set("grant_type", "authorization_code");
    params.set("code", code);

    const response = await fetchAPI(`oauth/token?${params}`, {
        method: "POST",
    });

    return await response.json();
}

export async function getRefreshToken(refreshToken: string): Promise<OAuthResponse> {
    const params = new URLSearchParams();
    params.set("client_id", process.env.CLIENT_ID!);
    params.set("client_secret", process.env.CLIENT_SECRET!);
    params.set("grant_type", "refresh_token");
    params.set("refresh_token", refreshToken);

    const response = await fetchAPI(`oauth/token?${params}`, {
        method: "POST",
    });

    return await response.json();
}
