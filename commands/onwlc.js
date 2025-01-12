module.exports = {
  name: 'onwlc',
  description: 'Bật tính năng chào mừng người dùng mới',
  async execute(message, args) {
    if (!args[0]) return message.reply('Vui lòng cung cấp kênh chào mừng!');
    const channel = message.guild.channels.cache.get(args[0]);

    if (!channel) return message.reply('Kênh không hợp lệ!');
    // Lưu kênh vào database hoặc file cấu hình
    // Cấu hình để bật tính năng chào mừng trong server
  }
};

