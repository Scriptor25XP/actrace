import { getOAuthToken } from "@/api/oauth";
import { setBundleCookies } from "@/util/cookies";
import { cookies } from "next/headers";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";

export async function GET(request: Request) {

    const params = new ReadonlyURLSearchParams(request.url);

    const state = params.get("state");
    const error = params.get("error");

    const code = params.get("code")!;
    // const scope = params.get("scope")!;

    const storage = await cookies();

    if (error) {
        console.log(error);

        storage.delete("access_token");
        storage.delete("expires_at");
        storage.delete("expires_in");
        storage.delete("refresh_token");

        redirect("/");
    }

    const {
        athlete,
        ...bundle
    } = await getOAuthToken(code);

    if (athlete?.id)
        storage.set("athlete_id", athlete.id.toString());

    await setBundleCookies(bundle);

    redirect(state ?? "/");
}
