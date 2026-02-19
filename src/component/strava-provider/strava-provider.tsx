"use client";

import { DetailedAthlete } from "@/type/strava";

import { PropsWithChildren, createContext } from "react";

interface Props {
    athlete: DetailedAthlete | null,
    oauthURI: string,
}

export const StravaContext = createContext<Props>({
    athlete: null,
    oauthURI: "",
});

export function StravaProvider({ children, ...props }: PropsWithChildren<Props>) {
    return (
        <StravaContext value={props}>
            {children}
        </StravaContext>
    );
}
