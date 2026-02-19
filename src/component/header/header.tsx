"use client";

import { AvatarProfile } from "@/component/avatar-profile/avatar-profile";
import { StravaContext } from "@/component/strava-provider/strava-provider";

import Link from "next/link";

import { useContext } from "react";

import styles from "./header.module.scss";

export function Header() {

    const { athlete, oauthURI } = useContext(StravaContext);

    return (
        <header className={styles.header}>
            <Link className={styles.title} href="/">Actrace</Link>
            <div className={styles.navigation}>
                {athlete ? (
                    <Link href="/athlete">
                        <AvatarProfile src={athlete.profile_medium}
                            alt="profile_medium"
                            width={50}
                            height={50}
                            className={styles.profile} />
                    </Link>
                ) : <Link href={oauthURI}>Login</Link>}
            </div>
        </header>
    );
}
