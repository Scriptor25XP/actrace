type Params = {
    url: string,
}

export async function GET(request: Request, {params}: { params: Promise<Params> }) {
    const {url} = await params;

    const response = await fetch(url, request);

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(response.body, {
        headers,
        status: response.status,
        statusText: response.statusText,
    });
}
