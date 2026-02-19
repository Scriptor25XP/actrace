import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: RouteContext<"/api/image/[url]">): Promise<NextResponse> {
    const { url } = await context.params;

    const response = await fetch(url, request);

    return new NextResponse(response.body, {
        headers: {
            "Content-Type": response.headers.get("Content-Type") ?? "image/*",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
        status: response.status,
        statusText: response.statusText,
    });
}
