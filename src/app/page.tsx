import { createWebhook } from "@/api/webhook";

async function handleClick() {
    "use server";

    const id = await createWebhook(`${process.env.BASE_URI}/api/webhook`, process.env.VERIFY_TOKEN!);
    console.log(`create webhook id=${id}`);
}

export default async function Page() {
    return (
        <>
            <p>press the button below to create a webhook:</p>
            <button onClick={handleClick}>
                create webhook
            </button>
        </>
    );
}
