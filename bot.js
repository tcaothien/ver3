const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const { token, mongoURI, port } = require('./config/config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Map();

// Kết nối với MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log('MongoDB connection error:', err));

client.once('ready', () => {
  console.log('Bot is online!');
});

client.login(token);

// Load các lệnh từ thư mục commands
const fs = require('fs');
const path = require('path');
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Lắng nghe tin nhắn
client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (client.commands.has(commandName)) {
    try {
      client.commands.get(commandName).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi thực thi lệnh!');
    }
  }
});

