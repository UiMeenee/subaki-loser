import fetch from 'node-fetch'
import * as R from 'ramda'
import {
    subakiPUUID,
    getMatchIdUrl,
    getMatchPUUIDUrl,
    apiKey,
} from './constants.js'

async function getWinOrLose() {
    let res = await fetch(
        getMatchPUUIDUrl + subakiPUUID + '/ids?api_key=' + apiKey,
    )
    let gameData = null
    const data = await res.json()
    console.log(data);
    const lastGame = data[0]
    if (!process.env.LAST_GAME)
        process.env.LAST_GAME = lastGame
    else if (process.env.LAST_GAME === lastGame) {
        return null
    }
    else 
        process.env.LAST_GAME = lastGame
        
    if (!R.isNil(lastGame)) {
        let game = await fetch(
            getMatchIdUrl + lastGame + '?api_key=' + apiKey,
        )
        gameData = await game.json()
    }
    else {
        console.error("No game to fetch")
    }
    return gameData
}

function checkNewGame() {

}

export { getWinOrLose }