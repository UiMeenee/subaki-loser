import {
    subakiPUUID
} from './constants.js'

import * as R from 'ramda'

let subakiTeamId = null
let ennemyTeamId = null

function findFromValue(json, value, field) {
    if (json[field] === value)
        return json
    return null
}

function getSubakiInfo(json) {
    let i = 0;
    let object = null
    do {
        object = findFromValue(json.info.participants[i], subakiPUUID, "puuid")
        i++
    } while (R.isNil(object))
    subakiTeamId = object.teamId
    ennemyTeamId = subakiTeamId === 100 ? 200 : 100
    return object
}

function getEnnemyInfo(json) {
    let i = 0
    let object = null
    do {
        object = findFromValue(json.info.participants[i], ennemyTeamId, "teamId")
        i++
    } while (R.isNil(object))
    return object
}

function upto2Decimal(num) {
    if (num > 0)
        return Math.floor(num * 100) / 100;
    else
        return Math.ceil(num * 100) / 100;
}

function giveMinutes(time) {
    return (time / 60)
}

function convertTimeStamp(time) {
    let secs = time % 60
    let minutes = time / 60

    return `${Math.round(minutes)}:${upto2Decimal(secs)}`
}

function getWayGameEnded(gameData) {
    let ennemyData = getEnnemyInfo(gameData)
    let subakiData = getSubakiInfo(gameData)
    if (subakiData.win) {
        if (ennemyData.teamEarlySurrendered) {
            return "ennemy team early surrendered"
        }
        else if (ennemyData.nexusLost === 1) {
            return "ennemy nexus exploded"
        }
        else {
            return "ennemy team surrendered"
        }
    }
    else {
        if (subakiData.teamEarlySurrendered) {
            return "subaki team early surrendered"
        }
        else if (subakiData.nexusLost === 1) {
            return "subaki nexus exploded"
        }
        else {
            return "subaki team surrendered"
        }
    }
    return null
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export { findFromValue, getSubakiInfo, giveMinutes, convertTimeStamp, upto2Decimal, getWayGameEnded, sleep }