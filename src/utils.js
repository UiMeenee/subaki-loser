function findFromValue(json, value) {
    if (json["puuid"] === value)
        return json
    return null
}

export { findFromValue }