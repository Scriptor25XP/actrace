import { getOAuthToken } from "@/api/oauth";

import { setBundleCookies } from "@/util/cookies";

import { cookies } from "next/headers";
import { ReadonlyURLSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {

    const params = new ReadonlyURLSearchParams(request.url);

    const state = params.get("state");
    const error = params.get("error");

    const code = params.get("code")!;
    const scope = params.get("scope")!;

    console.log(`oauth callback: state='${state}', error='${error}', code='${code}', scope='${scope}'`);

    const storage = await cookies();

    if (error) {
        console.error(`oauth failed: ${error}`);

        storage.delete("access_token");
        storage.delete("expires_at");
        storage.delete("expires_in");
        storage.delete("refresh_token");

        return NextResponse.redirect(process.env.BASE_URI!);
    }

    const {
        athlete,
        ...bundle
    } = await getOAuthToken(code);

    if (athlete?.id) {
        storage.set("athlete_id", athlete.id.toString());
    }

    await setBundleCookies(bundle);

    console.log(`oauth successfull`);
    return NextResponse.redirect(state ?? process.env.BASE_URI!);
}
