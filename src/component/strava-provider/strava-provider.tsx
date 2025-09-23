"use client";

import {DetailedAthlete} from "@/type/strava";
import {createContext, PropsWithChildren} from "react";

type Props = {
    athlete: DetailedAthlete | null,
    oauthURI: string,
}

export const StravaContext = createContext<Props>({
    athlete: null,
    oauthURI: "",
});

export function StravaProvider({children, ...props}: PropsWithChildren<Props>) {
    return (
        <StravaContext value={props}>
            {children}
        </StravaContext>
    );
}
