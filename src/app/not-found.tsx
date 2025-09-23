import styles from "./not-found.module.scss";

export default async function Page() {
    return (
        <>
            <h1>
                <span className={styles.code}>404</span>
                <span>Not Found</span>
            </h1>
            <p>
                <q>The resource you are looking for does not exist.</q>
                <br />
                - someone on the internet
            </p>
        </>
    );
}