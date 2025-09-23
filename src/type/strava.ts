export type ActivityType =
    "AlpineSki"
    | "BackcountrySki"
    | "Canoeing"
    | "Crossfit"
    | "EBikeRide"
    | "Elliptical"
    | "Golf"
    | "Handcycle"
    | "Hike"
    | "IceSkate"
    | "InlineSkate"
    | "Kayaking"
    | "Kitesurf"
    | "NordicSki"
    | "Ride"
    | "RockClimbing"
    | "RollerSki"
    | "Rowing"
    | "Run"
    | "Sail"
    | "Skateboard"
    | "Snowboard"
    | "Snowshoe"
    | "Soccer"
    | "StairStepper"
    | "StandUpPaddling"
    | "Surfing"
    | "Swim"
    | "Velomobile"
    | "VirtualRide"
    | "VirtualRun"
    | "Walk"
    | "WeightTraining"
    | "Wheelchair"
    | "Windsurf"
    | "Workout"
    | "Yoga";

export type SummaryClub = {
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

export type SummaryGear = {
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

export type DetailedAthlete = {
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
    created_at: string,
    /** The time at which the athlete was last updated. */
    updated_at: string,
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

/**
 * Webhook Event Data Payload
 */
export type EventData = {
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
