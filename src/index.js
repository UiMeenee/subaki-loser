import * as Discord from 'discord.js'
import {
    channelId,
    subakiPUUID,
    token
} from './constants.js'

import {
    getWinOrLose,
} from './requests.js'

const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] })

// https://www.youtube.com/watch?v=iivVWOgCLOI&t=187s
// https://discordjs.guide/popular-topics/webhooks.html#what-is-a-webhook
// https://discord.js.org/#/docs/main/main/class/TextChannel?scrollTo=fetchWebhooks
async function start() {
    bot.login(token)
    bot.on("ready", async () => {
        console.log(bot.channels);
        const botChannel = bot.channels.cache.get(channelId)

        let win = await getWinOrLose(subakiPUUID)
        try {
            botChannel.send(win)
        }
        catch (error) {
            console.error(error)
        }
    })
}
start()