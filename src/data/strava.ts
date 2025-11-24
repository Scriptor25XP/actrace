import { fetchEntity } from "@/api/fetch";
import { ActivityStats, ClubActivity, ClubAthlete, DetailedActivity, DetailedAthlete, DetailedClub, DetailedGear, Lap, Route, SummaryAthlete, SummaryClub, Zones } from "@/type/strava";
import { unstable_cache } from "next/cache";

const DAILY = 86400 as const;

// ------------------- ACTIVITY -------------------

export const getActivityById = (id: number) => unstable_cache(async () => {
    return fetchEntity<DetailedActivity>(`activities/${id}`);
}, [`${id}`], {
    tags: ["activity", `activity:${id}`],
    revalidate: DAILY,
})();

export const getCommentsByActivityId = (id: number) => unstable_cache(async () => {
    return fetchEntity<unknown[]>(`activities/${id}/comments`)
}, [`${id}`], {
    tags: ["activity", `activity:${id}`],
    revalidate: DAILY,
})();

export const getKudoersByActivityId = (id: number) => unstable_cache(async () => {
    return fetchEntity<unknown[]>(`activities/${id}/kudos`)
}, [`${id}`], {
    tags: ["activity", `activity:${id}`],
    revalidate: DAILY,
})();

export const getLapsByActivityId = (id: number) => unstable_cache(async () => {
    return fetchEntity<Lap[]>(`activities/${id}/laps`)
}, [`${id}`], {
    tags: ["activity", `activity:${id}`],
    revalidate: DAILY,
})();

export const getZonesByActivityId = (id: number) => unstable_cache(async () => {
    return fetchEntity<unknown[]>(`activities/${id}/zones`)
}, [`${id}`], {
    tags: ["activity", `activity:${id}`],
    revalidate: DAILY,
})();

// ------------------- ATHLETE -------------------

export const getLoggedInAthlete = () => unstable_cache(async () => {
    return fetchEntity<DetailedAthlete>("athlete");
}, [], {
    tags: ["athlete"],
    revalidate: DAILY,
})();

export const getLoggedInAthleteZones = () => unstable_cache(async () => {
    return fetchEntity<Zones>("athlete/zones");
}, [], {
    tags: ["athlete"],
    revalidate: DAILY,
})();

export const getLoggedInAthleteActivities = () => unstable_cache(async () => {
    return fetchEntity<unknown[]>(`athlete/activities`)
}, [], {
    tags: ["athlete"],
    revalidate: DAILY,
})();

export const getLoggedInAthleteClubs = () => unstable_cache(async () => {
    return fetchEntity<SummaryClub[]>(`athlete/clubs`);
}, [], {
    tags: ["athlete"],
    revalidate: DAILY,
})();

export const getStatsByAthleteId = (id: number) => unstable_cache(async () => {
    return fetchEntity<ActivityStats>(`athletes/${id}/stats`);
}, [`${id}`], {
    tags: ["athlete", `athlete:${id}`],
    revalidate: DAILY,
})();

// ------------------- CLUB -------------------

export const getClubById = (id: number) => unstable_cache(async () => {
    return fetchEntity<DetailedClub>(`clubs/${id}`);
}, [`${id}`], {
    tags: ["club", `club:${id}`],
    revalidate: DAILY,
})();

export const getActivitiesByClubId = (id: number) => unstable_cache(async () => {
    return fetchEntity<ClubActivity[]>(`clubs/${id}/activities`);
}, [`${id}`], {
    tags: ["club", `club:${id}`],
    revalidate: DAILY,
})();

export const getAdminsByClubId = (id: number) => unstable_cache(async () => {
    return fetchEntity<SummaryAthlete[]>(`clubs/${id}/admins`);
}, [`${id}`], {
    tags: ["club", `club:${id}`],
    revalidate: DAILY,
})();

export const getMembersByClubId = (id: number) => unstable_cache(async () => {
    return fetchEntity<ClubAthlete[]>(`clubs/${id}/members`);
}, [`${id}`], {
    tags: ["club", `club:${id}`],
    revalidate: DAILY,
})();

// ------------------- GEAR -------------------

export const getGearById = (id: number) => unstable_cache(async () => {
    return fetchEntity<DetailedGear>(`gear/${id}`);
}, [`${id}`], {
    tags: ["gear", `gear:${id}`],
    revalidate: DAILY,
})();

// ------------------- ROUTE -------------------

export const getRouteAsGPX = (id: number) => unstable_cache(async () => {
    return fetchEntity<unknown>(`routes/${id}/export_gpx`);
}, [`${id}`], {
    tags: ["route", `route:${id}`],
    revalidate: DAILY,
})();

export const getRouteAsTCX = (id: number) => unstable_cache(async () => {
    return fetchEntity<unknown>(`routes/${id}/export_tcx`);
}, [`${id}`], {
    tags: ["route", `route:${id}`],
    revalidate: DAILY,
})();

export const getRouteById = (id: number) => unstable_cache(async () => {
    return fetchEntity<Route>(`routes/${id}`);
}, [`${id}`], {
    tags: ["route", `route:${id}`],
    revalidate: DAILY,
})();
