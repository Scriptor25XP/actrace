import { EventData } from "@/type/strava";
import { storage } from "@/util/storage";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const payload: EventData = await request.json();

    await storage<EventData>("kv", "event", async storage => {
        storage.insert(payload);
    });

    console.log("webhook payload:");
    console.dir(payload, { depth: null });

    revalidateTag(`${payload.object_type}:${payload.object_id}`);
    revalidateTag(payload.object_type);

    return NextResponse.json({}, { status: 200, statusText: "OK" });
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get("hub.mode");
    const challenge = searchParams.get("hub.challenge");
    const verify_token = searchParams.get("hub.verify_token");

    if (mode !== "subscribe") {
        console.error(`webhook validation failed: mode '${mode}' does not match expected value 'subscribe'`);
        return new NextResponse(undefined, { status: 400, statusText: "Bad Request" });
    }

    if (verify_token !== process.env.VERIFY_TOKEN) {
        console.error(`webhook validation failed: verify_token '${verify_token}' does not match expected value '${process.env.VERIFY_TOKEN}'`);
        return new NextResponse(undefined, { status: 401, statusText: "Unauthorized" });
    }

    console.log("webhook validation successfull");
    return NextResponse.json({ "hub.challenge": challenge }, { status: 200, statusText: "OK" });
}
