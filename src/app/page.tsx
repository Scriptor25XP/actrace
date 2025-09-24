import { createWebhook, deleteWebhook, getWebhooks } from "@/api/webhook";
import { JsonView } from "@/component/json-view/json-view";
import { storage } from "@/util/storage";

type WebhookEntity = {
    id: number,
}

async function handleCreate() {
    "use server";

    await storage<WebhookEntity>("kv", "webhook", async storage => {
        const id = await createWebhook(`${process.env.BASE_URI}/api/webhook`, process.env.VERIFY_TOKEN!);
        console.log(`create webhook id=${id}`);

        storage.insert({ id });
    });
}

async function handleDelete() {
    "use server";

    await storage<WebhookEntity>("kv", "webhook", async storage => {
        const row = storage.row(0);
        const id = row.ref("id");

        if (!row.exists()) {
            return;
        }

        await deleteWebhook(id.get());
        console.log(`delete webhook id=${id.get()}`);

        row.remove();
    });
}

export default async function Page() {
    const webhooks = await getWebhooks();

    return (
        <>
            <button onClick={handleCreate}>
                create webhook
            </button>
            <button onClick={handleDelete}>
                delete webhook
            </button>
            <JsonView data={webhooks} />
        </>
    );
}
