/**
 * This is not a complete map of the keybase lookup response.  Many unused feilds are ommitted.
 */
export interface KeybaseUserLookupResponse {
    them: KeybaseUser
}

export interface KeybaseUser {
    id: String,
    profile: KeybaseUserProfile,
    pictures: KeybaseUserPictures,
    basics: KeybaseUserBasics,
    proofs_summary: KeybaseProofsSummary
}

export interface KeybaseUserProfile {
    full_name: String,
    location: String,
    bio: String
}

export interface KeybaseUserPictures {
    primary: KeybaseUserPicture
}

export interface KeybaseUserPicture {
    url: String,
    source: String
}


export interface KeybaseUserBasics {
    username: String
}

export interface KeybaseProofsSummary {
    all: KeybaseProof[]
}

export interface KeybaseProof {
    proof_type: String,
    nametag: String,
    state: number,
    service_url: String,
    proof_url: String,
    human_url: String,
    presentation_group: String,
    presentation_tag: String
}