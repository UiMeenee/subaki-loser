import fetch from 'node-fetch'
import * as R from 'ramda'
import {
    subakiPUUID,
    getMatchIdUrl,
    getMatchPUUIDUrl,
    apiKey,
    webhookUrl,
    getSummonerUrl,
} from './constants.js'

import { findFromValue } from './utils.js'

// Might be useless
async function postToWebhook(message) {
    let body = {
        content: message
    }
    let res = await fetch(webhookUrl + '?wait=true', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    let data = await res.json()
}

async function getWinOrLose(puuid) {
    let res = await fetch(
        getMatchPUUIDUrl + subakiPUUID + '/ids?api_key=' + apiKey,
    )
    const data = await res.json()
    const lastGame = data.at(0)
    let win = true
    if (!R.isNil(lastGame)) {
        let game = await fetch(
            getMatchIdUrl + lastGame + '?api_key=' + apiKey,
        )
        let gameData = await game.json()
        let object = null
        let i = 0;
        do {
            object = findFromValue(gameData.info.participants[i], subakiPUUID)
            i++
        } while (R.isNil(object))
        win = object.win
    }
    else {
        console.error("No game to fetch")
    }
    return win ? "won" : "lost"
}

export { postToWebhook, getWinOrLose }