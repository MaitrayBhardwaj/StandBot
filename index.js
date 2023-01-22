const keepAlive = require("./server");
require('dotenv').config();

const data = require('./data/data.json')

const { Client, MessageEmbed, Intents } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

const prefix = '>>';

let quizStat = 0;
let quizTries = 3;
let quizAnswer = '';
let quizChannels = [];

const { SDC, DIU, GW, SO } = data

const parts = ["SDC", "DIU", "GW", "SO"]

client.on('ready', () => {
  console.log(`${client.user.tag}`, "is online.");
});

client.on('messageCreate', (message) => {
  if (!message.author.bot) {
    if (quizStat === 1 && quizTries > 0 && !message.content.startsWith(prefix) && quizChannels.indexOf(message.channel.id) != -1) {
      let userAnswer = message.content.toLowerCase();
      if (quizAnswer.toLowerCase() === userAnswer) {
        message.channel.send('Correct answer!');
        quizChannels.pop(message.channel.id);
        quizStat = 0;
        quizTries = 3;
      }
      else {
        message.channel.send(`Incorrect guess. You have ${--quizTries} more tries.`);
        if (quizTries == 0) {
          quizStat = 0;
          quizTries = 3;
          message.channel.send(`The correct answer was ${quizAnswer}.`)
          quizChannels.pop(message.channel.id);
        }
      }
    }
    if (message.content.startsWith(prefix)) {
      quizStat = 0;
      quizTries = 3;
      quizChannels.push(message.channel.id);

      const [cmd_name, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/);

      if (cmd_name === "stand") {
        if (args[0] == null) {
          let selectedPart = data[parts[Math.floor(Math.random() * 4)]]
          let random = Math.floor(Math.random() * selectedPart.length);
          const embed = new MessageEmbed()
            .setTitle(selectedPart[random].standName)
            .setDescription(`Stand User: ${selectedPart[random].standUser}`)
            .setColor(0x0000ff)
            .setImage(selectedPart[random].standImg);
          message.channel.send({ embeds: [embed] });
        }

        else if (args == '3') {
          let random = Math.floor(Math.random() * SDC.length);
          const embed = new MessageEmbed()
            .setTitle(SDC[random].standName)
            .setDescription(`Stand User: ${SDC[random].standUser}`)
            .setColor(0x0000ff)
            .setImage(SDC[random].standImg);
          message.channel.send({ embeds: [embed] });
        }

        else if (args == '4') {
          let random = Math.floor(Math.random() * DIU.length);
          const embed = new MessageEmbed()
            .setTitle(DIU[random].standName)
            .setDescription(`Stand User: ${DIU[random].standUser}`)
            .setColor(0xf76adb)
            .setImage(DIU[random].standImg);
          message.channel.send({ embeds: [embed] });
        }

        else if (args == '5') {
          let random = Math.floor(Math.random() * GW.length);
          const embed = new MessageEmbed()
            .setTitle(GW[random].standName)
            .setDescription(`Stand User: ${GW[random].standUser}`)
            .setColor(0xffd700)
            .setImage(GW[random].standImg);
          message.channel.send({ embeds: [embed] });
        }
        else if (args == '6') {
          let random = Math.floor(Math.random() * SO.length);
          const embed = new MessageEmbed()
            .setTitle(SO[random].standName)
            .setDescription(`Stand User: ${SO[random].standUser}`)
            .setColor(0x00FFFF)
            .setImage(SO[random].standImg);
          message.channel.send({ embeds: [embed] });
        }

      }
      else if (cmd_name === "quiz") {
        if (args[0] == null) {
          let selectedPart = data[parts[Math.floor(Math.random() * 4)]]
          let random = Math.floor(Math.random() * selectedPart.length);
          const embed = new MessageEmbed()
            .setTitle("What is the name of this stand?")
            .setColor(0x0000ff)
            .setImage(selectedPart[random].standImg);
          message.channel.send({ embeds: [embed] });
          quizStat = 1;
          quizAnswer = selectedPart[random].standName;
        }

        else if (args == '3') {
          let random = Math.floor(Math.random() * SDC.length);
          const embed = new MessageEmbed()
            .setTitle('What is the name of this stand?')
            .setColor(0x0000ff)
            .setImage(SDC[random].standImg);
          message.channel.send({ embeds: [embed] });
          quizStat = 1;
          quizAnswer = SDC[random].standName;
        }

        else if (args == '4') {
          let random = Math.floor(Math.random() * DIU.length);
          const embed = new MessageEmbed()
            .setTitle('What is the name of this stand?')
            .setColor(0xf76adb)
            .setImage(DIU[random].standImg);
          message.channel.send({ embeds: [embed] });
          quizStat = 1;
          quizAnswer = DIU[random].standName;
        }

        else if (args == '5') {
          let random = Math.floor(Math.random() * GW.length);
          const embed = new MessageEmbed()
            .setTitle('What is the name of this stand?')
            .setColor(0xffd700)
            .setImage(GW[random].standImg);
          message.channel.send({ embeds: [embed] });
          quizStat = 1;
          quizAnswer = GW[random].standName;
        }
        else if (args == '6') {
          let random = Math.floor(Math.random() * SO.length);
          const embed = new MessageEmbed()
            .setTitle('What is the name of this stand?')
            .setColor(0x00FFFF)
            .setImage(SO[random].standImg);
          message.channel.send({ embeds: [embed] });
          quizStat = 1;
          quizAnswer = SO[random].standName;
        }
      }
      else if (cmd_name === 'invite') {
        const embed = new MessageEmbed()
          .setTitle('Invite me to your server!')
          .setDescription('https://discord.com/oauth2/authorize?client_id=872780399582011392&scope=bot&permissions=52224')
          .setThumbnail('https://fsb.zobj.net/crop.php?r=xmrWJrjPDB8hN-9UUASH-JnJghxTNjtHPIlkxNbLLLysT6MjrKPG01w4EewnTgIIyt2bDFgBibUbAdkpYvjZBmF3M4O65P1bOLPEfDaBLYYnq4zrkXhMsEVpnCPCA3d2ERkkjhWCuEgI0tulWWWZLTqeoASXXnXaYbMsy616w0bYhrKHe3BS9jlxjdJXRN74qxSHo_ZQosrf_O-d')
          .setColor(0x00ff00);
        message.channel.send({ embeds: [embed] });
      }
      else if (cmd_name === 'help') {
        const embed = new MessageEmbed()
          .setTitle("List of available commands")
          .setDescription("`Prefix : >>`\n\n• `stand : Displays a random stand.`\n• `quiz : Name the random stand.`\n• `stop : Stops the ongoing quiz.`\n• `invite : Invite the bot to your server.`\n\nAdd arguments like 3, 4, 5 and 6 to filter out the stands from these commands\n\n`For example,`\n`>>quiz 3`\n`only selects the stands from Part 3.`\n\n`Only the stands from Part 3, 4, 5 and 6 are added as of now.`");
        message.channel.send({ embeds: [embed] });
      }
      else if (cmd_name === 'stop') {
        quizStat = 0;
        quizTries = 3;
        message.channel.send(`The quiz ended abruptly. ${quizAnswer} was the correct answer.`);
        quizChannels.pop(message.channel.id)
      }
    }
  }
});

keepAlive();
client.login(process.env.StandBotToken);
