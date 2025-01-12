const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Reply = require('./models/Reply');
const fs = require('fs');
const path = require('path');
const express = require('express'); // Thêm Express nếu bạn muốn tạo HTTP server

// Khởi tạo client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Kết nối MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));

// Đọc các tệp lệnh
client.commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

// Sự kiện khi bot sẵn sàng
client.once('ready', () => {
  console.log(`${client.user.tag} đã online!`);
});

// Sự kiện khi bot nhận tin nhắn
client.on('messageCreate', async message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (command) {
    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('Đã có lỗi xảy ra khi thực thi lệnh này!');
    }
  }
});

// Thiết lập Express nếu bạn muốn chạy server HTTP
const app = express();

// Cổng được cung cấp qua biến môi trường PORT (Render tự động cấp cổng)
const port = process.env.PORT || 3000; // Nếu không có, sẽ dùng cổng mặc định là 3000
app.listen(port, () => {
  console.log(`Bot đang chạy trên cổng ${port}`);
});

// Khởi động bot
client.login(config.token);
