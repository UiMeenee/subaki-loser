import fetch from 'node-fetch'
import * as R from 'ramda'
import * as Discord from 'discord.js'
import {
    subakiName,
    subakiPUUID,
    getMatchIdUrl,
    getMatchPUUIDUrl,
    apiKey,
    webhookUrl,
    getSummonerUrl,
    secret,
    id,
    token
} from './constants.js'

const bot = new Discord.Client({ intents: 2592 })

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
        headers: { 'Content-Type': 'application/json' }
    })
    let data = await res.json()
}

function findFromValue(json, value) {
    if (json["puuid"] === value)
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

// https://www.youtube.com/watch?v=iivVWOgCLOI&t=187s
// https://discordjs.guide/popular-topics/webhooks.html#what-is-a-webhook
// https://discord.js.org/#/docs/main/main/class/TextChannel?scrollTo=fetchWebhooks
async function start() {
    bot.login(token)
    bot.on("ready", async () => {
        bot.on('webhookUpdate', async () => {
            console.log('fais un tennis');
        })
        await getSummoner(subakiName)
        let win = await getWinOrLose(subakiPUUID)
        await postToWebhook(win)
        bot.on('typingStart', async () => {
            await postToWebhook('pk tu parles toi')
        })

    })
}
start()