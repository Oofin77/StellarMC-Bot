const {
  Client,
  Partials,
  Collection,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const config = require("./config/config");
const colors = require("colors");

const schedule = require("node-schedule");

require('dotenv').config();

// Creating a new client:
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
  ],
  presence: {
    activities: [
      {
        name: ".gg/mcstellar",
        type: 3,
      },
    ],
    status: "online",
  },
});

// Host the bot:
require("http")
  .createServer((req, res) => res.end("Ready."))
  .listen(3000);

// Getting the bot token:
const AuthenticationToken = process.env.TOKEN || config.Client.TOKEN;
if (!AuthenticationToken) {
  console.warn(
    "[CRASH] Authentication Token for Discord bot is required! Use Envrionment Secrets or config.js."
      .red
  );
  return process.exit();
}

// Handler:
client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.events = new Collection();

module.exports = client;

["prefix", "application_commands", "modals", "events", "mongoose"].forEach(
  (file) => {
    require(`./handlers/${file}`)(client, config);
  }
);



client.on("messageCreate", async (message) => {
  
  
  const channelLink = `https://discord.com/channels/898761076638896148/898996679053828100`;
  if (message.content === "!embedwithbuttons") {
    const button1 = new ButtonBuilder()
      .setCustomId("button1")
      .setLabel("Level Rewards")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji({ name: "insightsicon", id: "1180294316007108639" });

    const button2 = new ButtonBuilder()
      .setCustomId("button2")
      .setLabel("Special Roles")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji({ name: "previewicon", id: "1180294156296396806" });

    const button3 = new ButtonBuilder()
      .setCustomId("button3")
      .setLabel("Booster Perks")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji({ name: "boostericon", id: "1180294051820478625" });

    const button4 = new ButtonBuilder()
      .setLabel("Server Rules")
      .setURL(channelLink)
      .setStyle(ButtonStyle.Link)
      .setEmoji({ name: "rulesicon", id: "1180293946249842718" });

    const row = new ActionRowBuilder().addComponents(
      button1,
      button2,
      button3,
      button4
    );

    const emojiId = "1136450304225837116";
    const guildId = "898761076638896148"; // Replace with the actual guild ID

    const guild = client.guilds.cache.get(guildId);

    const emoji = await guild.emojis.fetch(emojiId);

    let welcomembed = new EmbedBuilder()
      .setDescription(
        `## **Welcome to Zulii's Dojo**\n\nThanks for joining the server; we hope you enjoy your stay! This server is based around Zulii's socials, connecting here, and having a good time.\n\nDespite all of that, anybody is welcome to join the community and have a chat! We often try to host events here and there along with other stuff, so make sure you grab some <#924034770311204946>!`
      )
      .setColor("FF0000");

    message.channel.send({ embeds: [welcomembed], components: [row], timeout: 0, });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isButton()) return;


      

     if (interaction.customId === "button1") {
        await interaction.reply({
          embeds: [
            {
              title: "Level Rewards [COMING SOON]",
              color: 36863,
            },
          ],
          ephemeral: true,
        });
      } else if (interaction.customId === "button2") {
        await interaction.reply({
          embeds: [
            {
              title: "<:rolesicon:1179938006753353819> Special Roles",
              description:
                "These roles are usually harder to get but set you apart from other users within the Discord Server",
              color: 16776444,
              fields: [
                {
                  name: "‎",
                  value:
                    "<@&952124312540815360>‎ \n\n• Must be a Content Creator\n• Being good friends with Zulii\n• This role is given personally and should not be something asked for",
                  inline: true,
                },
                {
                  name: "‎",
                  value:
                    '<@&1157201096117342229>\n\n• Redeem "Tax Evader" channel redemption in the twitch\'s streams',
                  inline: true,
                },
                {
                  name: "‎",
                  value:
                    "<@&1007890060416385096>‎ \n\n• Given whenever you receive VIP in the twitch chat (__excluding temporary VIP__)",
                  inline: true,
                },
                {
                  name: "‎",
                  value:
                    '<@&1002367938201923625>\n\n• Redeem "Ninja Role" channel redemption in the twitch\'s streams. (Please make sure to make a <#924090914509561900> to obtain your role provided with a screenshot of the redeem)',
                  inline: true,
                },
                {
                  name: "‎",
                  value:
                    "<@&1134962235463192666>\n\n• Acquired when you buy something off of Zulii's wishlist",
                  inline: true,
                },
                {
                  name: "‎",
                  value:
                    "<@&950232986119471134>\n\n• Given to the top gifters of Zulii's twitch (all-time)",
                  inline: true,
                },
              ],
            },
          ],
          ephemeral: true,
        });
      } else if (interaction.customId === "button3") {
        await interaction.reply({
          embeds: [
            {
              title: "<:Boost:948326770917113876> Booster Perks",
              description:
                "Your generous server boost greatly benefits us, and we sincerely appreciate your decision to boost. Upon boosting, you'll receive exclusive perks and gain access to hidden channels as a token of our gratitude.",
              color: 16711925,
              fields: [
                {
                  name: "<:Boost:948326770917113876> Boost Once, and Get",
                  value:
                    "• Colored Roles\n• An Unique Role <@&931988431742058531>\n• Private VC\n• Ability to upload images in other channels\n• And more!",
                },
              ],
            },
          ],
          ephemeral: true,
        });
      }
      
    });
  }
  }
          )

const targetChannelId = "930200857738379285";
client.on("messageCreate", async (message) => {
  // Check if the message is in the target channel
  if (
    message.channel.id === targetChannelId &&
    message.content.toLowerCase().includes("no stream") &&
    message.mentions.users.has("929982996856045639")
  ) {
    // Check if the user mentioned the target user
    // Add reactions in a certain order
    try {
      await message.react("1️⃣"); // Replace with your desired emoji
      await message.react("2️⃣"); // Replace with your desired emoji
      await message.react("3️⃣"); // Replace with your desired emoji
      await message.react("4️⃣"); // Replace with your desired emoji
    } catch (err) {
      console.error(`Failed to add reactions: ${err}`);
    }
  }
});

const suggestionChannelId = "1161152608325619833";

client.on("messageCreate", async (message) => {
  if (message.channelId === suggestionChannelId && !message.author.bot) {
    // Create the suggestion embed
    const suggestionEmbed = {
      title: "✍️ Suggestion",
      description: message.content,
      color: 0x66df84,
      footer: {
        text: `${message.author.username} • ✅ Agree | ❌ Disagree | ❓ I don't understand`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      },
    };
    message.delete();
    // Send the suggestion embed to the same channel
    const suggestionMessage = await message.channel.send({
      embeds: [suggestionEmbed],
    });

    // Create a new thread for the embed message
    const suggestionThread = await suggestionMessage.startThread({
      name: suggestionEmbed.description,
    });

    // Add reaction buttons to the embed message in the thread
    await suggestionMessage.react("✅");
    await suggestionMessage.react("❌");
    await suggestionMessage.react("❓");

    const oldGuideMessages = await message.channel.messages.fetch({
      limit: 10,
    }); // Adjust limit as needed
    const oldGuideMessage = oldGuideMessages.find(
      (msg) => msg.embeds[0] && msg.embeds[0].title === "⭐ Suggestions"
    );

    if (oldGuideMessage) {
      await oldGuideMessage.delete();
    }

    // Send a new guide message
    sendGuideMessage(message.channel);
  }
});

async function sendGuideMessage(channel) {
  // Create a new guide embed
  const guideEmbed = {
    title: "⭐ Suggestions",
    description:
      "Post a suggestion in the channel by just typing here, when you send the message it will automatically post it in the right format. If you have any questions, please contact a staff member.",
    color: 0xe3ca75,
  };

  // Send the new guide message
  await channel.send({ embeds: [guideEmbed] });
}

// Login to the bot:
client.login(AuthenticationToken).catch((err) => {
  console.error("[CRASH] Something went wrong while connecting to your bot...");
  console.error("[CRASH] Error from Discord API:" + err);
  return process.exit();
});

// Handle errors:
process.on("unhandledRejection", async (err, promise) => {
  console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
  console.error(promise);
});
