import { fetchEntity } from "@/api/fetch";
import { deauthorizeOAuth } from "@/api/oauth";

import { AvatarProfile } from "@/component/avatar-profile/avatar-profile";

import { DetailedAthlete } from "@/type/strava";

import { getBundleCookies } from "@/util/cookies";

import { faStar as faStarR } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { notFound, redirect } from "next/navigation";

import styles from "./page.module.scss";

export default async function Page() {
    const bundle = await getBundleCookies();
    if (!bundle) {
        return redirect("/");
    }

    async function handleClick() {
        "use server";

        if (bundle) {
            await deauthorizeOAuth(bundle.access_token);
            return redirect("/");
        }
    }

    const athlete = await fetchEntity<DetailedAthlete>("athlete");
    if (!athlete) {
        notFound();
    }

    return (
        <div className={styles.content}>
            <div>
                <AvatarProfile src={athlete.profile} alt="profile" width={120} height={120} />
            </div>
            <h2>
                <FontAwesomeIcon icon={athlete.summit ? faStarS : faStarR} /> {athlete.firstname} {athlete.lastname}
            </h2>
            <button onClick={handleClick}>
                Revoke access via OAuth
            </button>
        </div>
    );
}
