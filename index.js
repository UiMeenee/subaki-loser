import fetch from 'node-fetch';
const webhookUrl = "https://discord.com/api/webhooks/1039315482152550400/F4IipIJECZBb0REnSt4wURjSB5e9NLTwP9y87sz9fueSYmEtgEtCYwYz20d7JLRp_mTN"
const getSummonerUrl = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const getMatchPUUIDUrl = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/"
const getMatchIdUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/'
const apiKey = 'RGAPI-276658ed-6d40-47b5-9a35-6eea690c7be7'
const subakiName = 'TlME TO TROLL'
const subakiPUUID = "0dpkw5VWwvpErgYCoFXEtxILoqRycxP4z1E0A0UTI8SfvhPz7S3-j9h3koDxqNX-WwFvMQLf_f9RPQ"
import * as R from 'ramda'

async function getSummoner(name) {
    let res = await fetch(
        getSummonerUrl + name + '?api_key=' + apiKey,
    )
    let data = await res.json()
}

async function postToWebhook(message) {
    let body = {
        content: message
    }
    let res = await fetch(webhookUrl + '?wait=true', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    let data = await res.json()
}

function findFromValue(json, value) {
    if(json["puuid"] === value)
        return json
    return null
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
        console.log(object);
        win = object.win
    }
    else {
        console.error("No game to fetch")
    }
    return win ? "won" : "lost"
}

await getSummoner(subakiName)
let win = await getWinOrLose(subakiPUUID)
await postToWebhook(win)