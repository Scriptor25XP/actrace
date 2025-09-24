import { Webhook } from "@/type/strava";
import "server-only";
import { fetchAPI } from "./fetch";

export async function createWebhook(callback_url: string, verify_token: string) {
    const data = new FormData();
    data.set("client_id", process.env.CLIENT_ID!);
    data.set("client_secret", process.env.CLIENT_SECRET!);
    data.set("callback_url", callback_url);
    data.set("verify_token", verify_token);

    const response = await fetchAPI("push_subscriptions", {
        method: "POST",
        body: data,
    });

    const payload: { id: number } = await response.json();

    return payload.id;
}

export async function getWebhooks(): Promise<Webhook[]> {
    const params = new URLSearchParams();
    params.set("client_id", process.env.CLIENT_ID!);
    params.set("client_secret", process.env.CLIENT_SECRET!);

    const response = await fetchAPI(`push_subscriptions?${params}`, {
        method: "GET",
    });

    return response.json();
}

export async function deleteWebhook(id: number) {
    const params = new URLSearchParams();
    params.set("client_id", process.env.CLIENT_ID!);
    params.set("client_secret", process.env.CLIENT_SECRET!);

    await fetchAPI(`push_subscriptions/${id}?${params}`, {
        method: "DELETE",
    });
}
