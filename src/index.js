import * as Discord from 'discord.js'
import * as R from 'ramda'
import {
  channelId,
  subakiPUUID,
  token
} from './constants.js'

import {
  getSubakiInfo,
  giveMinutes,
  convertTimeStamp,
  upto2Decimal,
  getWayGameEnded,
  sleep
} from './utils.js'

import {
  getWinOrLose,
} from './requests.js'

const bot = new Discord.Client({ intents: 3276799 })

async function computeMessage() {
  let data = await getWinOrLose()
  if (R.isNil(data)) {
    return null
  }
  let gameData = getSubakiInfo(data)
  console.log(gameData);
  let win = gameData.win ? 'won' : 'lost'
  let winMessage = gameData.win ? 'Omg rush diamant ????' : 'Omg rush plat 4 0 lp ???'
  let kda = `He was in ${gameData.kills}/${gameData.deaths}/${gameData.assists}`
  let visionScore = `He had a ${gameData.visionScore} vision score or ${upto2Decimal(gameData.visionScore / giveMinutes(data.info.gameDuration))} vision score per minutes`
  let pinks = `He bought ${gameData.visionWardsBoughtInGame} pink`
  let mes = `Subaki ${win} a game`
  let time = convertTimeStamp(data.info.gameDuration)
  let dispTime = `Game lasted ${time}`
  let gameEnding = getWayGameEnded(data)
  let dispEnding = `Game ended after ${gameEnding}`
  let champion = `He played ${gameData.championName}`
  let position = `On ${gameData.individualPosition} lane`
  let color = gameData.win ? 0x2095b5 : 0x6c6c6c
  const message = {
    "channel_id": channelId,
    "content": `Babe wake up new Subaki game just dropped`,
    "tts": false,
    "embeds": [
      {
        "type": "rich",
        "title": mes,
        "description": winMessage,
        "color": color,
        "fields": [
          {
            "name": kda,
            "value": `A loser kda`
          },
          {
            "name": visionScore,
            "value": pinks
          },
          {
            "name": dispTime,
            "value": dispEnding
          },
          {
            "name": champion,
            "value": position
          }
        ],
        "thumbnail": {
          "height": 0,
          "width": 0
        },
        "footer": {
          "text": `Subaki-loser`,
        }
      }
    ]
  }
  return message
}

async function start() {
  bot.login(token)
  bot.on("ready", async () => {
    while (bot.isReady()) {
      let message = await computeMessage()
      if (R.isNil(message)) {
        console.log("skipped game")
        await sleep(60000)
        continue
      }
      const botChannel = bot.channels.cache.get(channelId)
      try {
        botChannel.send(message)
      }
      catch (error) {
        console.error(error)
      }
      await sleep(60000)
    }
  })
}
start()
