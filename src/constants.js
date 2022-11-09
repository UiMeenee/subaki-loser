const webhookUrl = "https://discord.com/api/webhooks/1039315482152550400/F4IipIJECZBb0REnSt4wURjSB5e9NLTwP9y87sz9fueSYmEtgEtCYwYz20d7JLRp_mTN"
const getSummonerUrl = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const getMatchPUUIDUrl = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/"
const getMatchIdUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/'
const subakiName = 'TlME TO TROLL'
const subakiPUUID = "0dpkw5VWwvpErgYCoFXEtxILoqRycxP4z1E0A0UTI8SfvhPz7S3-j9h3koDxqNX-WwFvMQLf_f9RPQ"
const id = '1039339247917871124'
const channelId = '1039306918142935060'
const secret = process.env.SECRET
const token = process.env.BOT_TOKEN // Don't put your token in clear here !!
const apiKey = process.env.RIOT_KEY

export {
    webhookUrl,
    getSummonerUrl,
    getMatchIdUrl,
    getMatchPUUIDUrl,
    apiKey,
    subakiName,
    subakiPUUID,
    secret,
    id,
    token,
    channelId,
}

