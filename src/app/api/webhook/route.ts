import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const payload = await request.json();

    return NextResponse.json({}, { status: 200, statusText: "OK" });
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get("hub.mode");
    const challenge = searchParams.get("hub.challenge");
    const verify_token = searchParams.get("hub.verify_token");

    if (mode !== "subscribe")
        return new NextResponse(undefined, { status: 400, statusText: "Bad Request" });

    if (verify_token !== process.env.VERIFY_TOKEN)
        return new NextResponse(undefined, { status: 401, statusText: "Unauthorized" });

    return NextResponse.json({ "hub.challenge": challenge }, { status: 200, statusText: "OK" });
}
