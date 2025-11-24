export type DateTime = unknown;
export type LatLng = [number, number];

export interface PolylineMap {
    id: string,
    polyline: string,
    summary_polyline: string,
};

export enum ActivityType {
    AlpineSki,
    BackcountrySki,
    Canoeing,
    Crossfit,
    EBikeRide,
    Elliptical,
    Golf,
    Handcycle,
    Hike,
    IceSkate,
    InlineSkate,
    Kayaking,
    Kitesurf,
    NordicSki,
    Ride,
    RockClimbing,
    RollerSki,
    Rowing,
    Run,
    Sail,
    Skateboard,
    Snowboard,
    Snowshoe,
    Soccer,
    StairStepper,
    StandUpPaddling,
    Surfing,
    Swim,
    Velomobile,
    VirtualRide,
    VirtualRun,
    Walk,
    WeightTraining,
    Wheelchair,
    Windsurf,
    Workout,
    Yoga,
};

export enum SportType {
    AlpineSki,
    BackcountrySki,
    Badminton,
    Canoeing,
    Crossfit,
    EBikeRide,
    Elliptical,
    EMountainBikeRide,
    Golf,
    GravelRide,
    Handcycle,
    HighIntensityIntervalTraining,
    Hike,
    IceSkate,
    InlineSkate,
    Kayaking,
    Kitesurf,
    MountainBikeRide,
    NordicSki,
    Pickleball,
    Pilates,
    Racquetball,
    Ride,
    RockClimbing,
    RollerSki,
    Rowing,
    Run,
    Sail,
    Skateboard,
    Snowboard,
    Snowshoe,
    Soccer,
    Squash,
    StairStepper,
    StandUpPaddling,
    Surfing,
    Swim,
    TableTennis,
    Tennis,
    TrailRun,
    Velomobile,
    VirtualRide,
    VirtualRow,
    VirtualRun,
    Walk,
    WeightTraining,
    Wheelchair,
    Windsurf,
    Workout,
    Yoga,
};

export interface PhotosSummary {
    count: number,
    primary: {
        id: number,
        source: number,
        unique_id: string,
        urls: string,
    },
};

export interface SummaryClub {
    /** The club's unique identifier. */
    id: number,
    /** Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail" */
    resource_state: 1 | 2 | 3,
    /** The club's name. */
    name: string,
    /** URL to a 60x60 pixel profile picture. */
    profile_medium: string,
    /** URL to a ~1185x580 pixel cover photo. */
    cover_photo: string,
    /** URL to a ~360x176 pixel cover photo. */
    cover_photo_small: string,
    /** Deprecated. Prefer to use activity_types. May take one of the following values: cycling, running, triathlon, other */
    sport_type: "cycling" | "running" | "triathlon" | "other",
    /** The activity types that count for a club. This takes precedence over sport_type. */
    activity_types: ActivityType,
    /** The club's city. */
    city: string,
    /** The club's state or geographical region. */
    state: string,
    /** The club's country. */
    country: string,
    /** Whether the club is private. */
    private: boolean,
    /** The club's member count. */
    member_count: number,
    /** Whether the club is featured or not. */
    featured: boolean,
    /** Whether the club is verified or not. */
    verified: boolean,
    /** The club's vanity URL. */
    url: string,
};

export interface SummaryGear {
    /** The gear's unique identifier. */
    id: string,
    /** Resource state, indicates level of detail. Possible values: 2 -> "summary", 3 -> "detail" */
    resource_state: 2 | 3,
    /** Whether this gear's is the owner's default one. */
    primary: boolean,
    /** The gear's name. */
    name: string,
    /** The distance logged with this gear. */
    distance: number,
};

export interface DetailedAthlete {
    /** The unique identifier of the athlete */
    id: number,
    /** Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail" */
    resource_state: 1 | 2 | 3,
    /** The athlete's first name. */
    firstname: string,
    /** The athlete's last name. */
    lastname: string,
    /** URL to a 62x62 pixel profile picture. */
    profile_medium: string,
    /** URL to a 124x124 pixel profile picture. */
    profile: string,
    /** The athlete's city. */
    city: string,
    /** The athlete's state or geographical region. */
    state: string,
    /** The athlete's country. */
    country: string,
    /** The athlete's sex. May take one of the following values: M, F */
    sex: "M" | "F",
    /** Deprecated. Use summit field instead. Whether the athlete has any Summit subscription. */
    premium: boolean,
    /** Whether the athlete has any Summit subscription. */
    summit: boolean,
    /** The time at which the athlete was created. */
    created_at: DateTime,
    /** The time at which the athlete was last updated. */
    updated_at: DateTime,
    /** The athlete's follower count. */
    follower?: number,
    /** The athlete's friend count. */
    friend?: number,
    /** The athlete's preferred unit system. May take one of the following values: feet, meters */
    measurement_preference?: "feet" | "meters",
    /** The athlete's FTP (Functional Threshold Power). */
    ftp?: number,
    /** The athlete's weight. */
    weight?: number,
    /** The athlete's clubs. */
    clubs?: SummaryClub,
    /** The athlete's bikes. */
    bikes?: SummaryGear,
    /** The athlete's shoes. */
    shoes?: SummaryGear,
};

export interface ZoneRange {
    min: number,
    max: number,
};
export type ZoneRanges = ZoneRange[];

export interface HeartRateZoneRanges {
    custom_zones: boolean,
    zones: ZoneRanges,
};

export interface PowerZoneRanges {
    zones: ZoneRanges,
};

export interface Zones {
    heart_rate: HeartRateZoneRanges,
    power: PowerZoneRanges,
};

export interface ActivityTotal {
    count: number,
    distance: number,
    moving_time: number,
    elapsed_time: number,
    elevation_gain: number,
    achievement_count: number,
};

export interface ActivityStats {
    biggest_ride_distance: number,
    biggest_climb_elevation_gain: number,
    recent_ride_totals: ActivityTotal,
    recent_run_totals: ActivityTotal,
    recent_swim_totals: ActivityTotal,
    ytd_ride_totals: ActivityTotal,
    ytd_run_totals: ActivityTotal,
    ytd_swim_totals: ActivityTotal,
    all_ride_totals: ActivityTotal,
    all_run_totals: ActivityTotal,
    all_swim_totals: ActivityTotal,
};

export interface MetaAthlete {
    id: number,
};

export interface MetaActivity {
    id: number,
};

export interface SummaryPRSegmentEffort {
    pr_activity_id: number,
    pr_elapsed_time: number,
    pr_date: DateTime,
    effort_count: number,
};

export interface SummarySegmentEffort {
    id: number,
    activity_id: number,
    elapsed_time: number,
    start_date: DateTime,
    start_date_local: DateTime,
    distance: number,
    is_kom: boolean,
};

export interface SummarySegment {
    id: number,
    name: string,
    activity_type: "Ride" | "Run",
    distance: number,
    average_grade: number,
    maximum_grade: number,
    elevation_high: number,
    elevation_low: number,
    start_latlng: LatLng,
    end_latlng: LatLng,
    climb_category: number,
    city: string,
    state: string,
    country: string,
    private: boolean,
    athlete_pr_effort: SummaryPRSegmentEffort,
    athlete_segment_stats: SummarySegmentEffort,
};

export interface DetailedSegmentEffort {
    id: number,
    activity_id: number,
    elapsed_time: number,
    start_date: DateTime,
    start_date_local: DateTime,
    distance: number,
    is_kom: boolean,
    name: string,
    activity: MetaActivity,
    athlete: MetaAthlete,
    moving_time: number,
    start_index: number,
    end_index: number,
    average_cadence: number,
    average_watts: number,
    device_watts: boolean,
    average_heartrate: number,
    max_heartrate: number,
    segment: SummarySegment,
    kom_rank: number,
    pr_rank: number,
    hidden: boolean,
};

export interface Split {
    average_speed: number,
    distance: number,
    elapsed_time: number,
    elevation_difference: number,
    pace_zone: number,
    moving_time: number,
    split: number,
};

export interface Lap {
    id: number,
    activity: MetaActivity,
    athlete: MetaAthlete,
    average_cadence: number,
    average_speed: number,
    distance: number,
    elapsed_time: number,
    start_index: number,
    end_index: number,
    lap_index: number,
    max_speed: number,
    moving_time: number,
    name: string,
    pace_zone: number,
    split: number,
    start_date: DateTime,
    start_date_local: DateTime,
    total_elevation_gain: number,
};

export interface DetailedActivity {
    id: number,
    external_id: string,
    upload_id: number,
    athlete: MetaAthlete,
    name: string,
    distance: number,
    moving_time: number,
    elapsed_time: number,
    total_elevation_gain: number,
    elev_high: number,
    elev_low: number,
    type: ActivityType,
    sport_type: SportType,
    start_date: DateTime,
    start_date_local: DateTime,
    timezone: string,
    start_latlng: LatLng,
    end_latlng: LatLng,
    achievement_count: number,
    kudos_count: number,
    comment_count: number,
    athlete_count: number,
    photo_count: number,
    total_photo_count: number,
    map: PolylineMap,
    trainer: boolean,
    commute: boolean,
    manual: boolean,
    private: boolean,
    flagged: boolean,
    workout_type: number,
    upload_id_str: string,
    average_speed: number,
    max_speed: number,
    has_kudoed: boolean,
    hide_from_home: boolean,
    gear_id: string,
    kilojoules: number,
    average_watts: number,
    device_watts: boolean,
    max_watts: number,
    weighted_average_watts: number,
    description: string,
    photos: PhotosSummary,
    gear: SummaryGear,
    calories: number,
    segment_efforts: DetailedSegmentEffort,
    device_name: string,
    embed_token: string,
    splits_metric: Split,
    splits_standard: Split,
    laps: Lap,
    best_efforts: DetailedSegmentEffort,
};

/**
 * Webhook Event Data Payload
 */
export interface EventData {
    /**
     * Always "create," "update," or "delete." 
     */
    aspect_type: "create" | "update" | "delete",
    /**
     * The time that the event occurred. 
     */
    event_time: number,
    /**
     * For activity events, the activity's ID. For athlete events, the athlete's ID. 
     */
    object_id: number,
    /**
     * Always either "activity" or "athlete." 
     */
    object_type: "activity" | "athlete",
    /**
     * The athlete's ID. 
     */
    owner_id: number,
    /**
     * The push subscription ID that is receiving this event. 
     */
    subscription_id: number,
    /**
     * For activity update events, keys can contain "title", "type", and "private",
     * which is always "true" (activity visibility set to Only You) or "false" (activity visibility set to Followers Only or Everyone).
     * For app deauthorization events, there is always an "authorized" : "false" key-value pair. 
     */
    updates: object,
};

export interface Webhook {
    id: number,
    resource_state: number,
    application_id: number,
    callback_url: string,
    created_at: string,
    updated_at: string,
};

export type SummaryAthlete = unknown;
export type DetailedClub = unknown;
export type ClubActivity = unknown;
export type ClubAthlete = unknown;
export type DetailedGear = unknown;
export type Route = unknown;
