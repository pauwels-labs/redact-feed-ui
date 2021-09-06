export interface KeybaseUserSearchResponse {
    list: KeybaseSearchResult[]
}

export interface KeybaseSearchResult {
    score: number,
    keybase: keybaseUserSummary,
}

export interface keybaseUserSummary {
    full_name: String,
    username: String,
    picture_url: String,
    uid: String,
}