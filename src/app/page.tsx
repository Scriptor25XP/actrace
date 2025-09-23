import { createWebhook } from "@/api/webhook";

async function handleClick() {
    "use server";

    createWebhook(`${process.env.BASE_URI}/api/webhook`, process.env.VERIFY_TOKEN!);
}

export default async function Page() {
    return (
        <>
            <button onClick={handleClick}>
                register webhook
            </button>
        </>
    );
}
