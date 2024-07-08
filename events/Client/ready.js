const client = require("../../index");
const colors = require("colors");
const axios = require('axios');

module.exports = {
  name: "ready.js"
};

// Define an array of streamers
const streamers = [
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'oClyne', targetUserId: '758511637996634143' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'all1gat0r_', targetUserId: '999848071393464410' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'burniegav', targetUserId: '305179355783364638' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'donutboiiscool', targetUserId: '823645834809442324' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'dripsir', targetUserId: '1065749121916473454' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'eeveline_', targetUserId: '267638371013230593' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'jstjamie', targetUserId: '597162734672412684' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'itskarottv', targetUserId: '787544027620179980' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'kendest', targetUserId: '1074413161555427460' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'redarchertwitch', targetUserId: '629915738437845012' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'zozzie', targetUserId: '659722918028115980' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'itsdyon', targetUserId: '338381257606037515' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'kenzielxv', targetUserId: '724461787046477885' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'marcytime', targetUserId: '882516254106206228' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'moodeez', targetUserId: '516034671784624128' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'ofishio', targetUserId: '919121367943774268' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'pantherplayyz', targetUserId: '603279610423017485' },
  { roleId: '1014323001325531236', guildId: '1013528103114506250', twitchUsername: 'qZulii', targetUserId: '600575298357952522' },
];

client.once('ready', async () => {
  console.log("\n" + `[READY] ${client.user.tag} is up and ready to go.`.brightGreen);

  setInterval(async () => {
    try {
      for (const streamer of streamers) {
        const { roleId, guildId, twitchUsername, targetUserId } = streamer;

        const response = await axios.get(`https://decapi.me/twitch/uptime/${twitchUsername}`);
        const twitchStatus = response.data.trim();

        const guild = client.guilds.cache.get(guildId);
        const member = await guild.members.fetch(targetUserId);
        const onlineRole = guild.roles.cache.get(roleId);

        if (!onlineRole) {
          console.error(`Role not found for streamer ${twitchUsername}`);
          continue;
        }

        if (twitchStatus.toLowerCase().includes('offline')) {
          if (member && member.roles.cache.has(roleId)) {
            await member.roles.remove(onlineRole);
            
          }
        } else {
          if (member && !member.roles.cache.has(roleId)) {
            await member.roles.add(onlineRole);
            
          }
        }
      }
    } catch (error) {
      console.error('Error checking Twitch status:', error.message);
    }
  }, 60 * 1000);
});