module.exports = {
  name: 'onwlc',
  description: 'Bật tính năng tự động welcome khi có member mới vào server.',
  async execute(message, args) {
    // Kiểm tra quyền của người dùng
    if (!message.member.permissions.has('MANAGE_GUILD')) {
      return message.reply('Bạn không có quyền sử dụng lệnh này!');
    }

    // Kiểm tra kênh chào mừng
    if (!args[0]) return message.reply('Vui lòng cung cấp ID kênh chào mừng!');
    
    const channel = message.guild.channels.cache.get(args[0]);
    if (!channel || channel.type !== 'GUILD_TEXT') return message.reply('Kênh không hợp lệ hoặc không phải kênh văn bản!');

    // Lưu cấu hình kênh vào database
    await message.guild.settings.update({ welcomeChannel: args[0] });

    message.reply(`Tính năng chào mừng đã được bật cho kênh ${channel.name}.`);

    // Lắng nghe sự kiện thành viên mới tham gia
    message.guild.on('guildMemberAdd', member => {
      const channel = member.guild.channels.cache.get(member.guild.settings.welcomeChannel);
      if (channel) {
        channel.send(`Chào mừng ${member.user.tag} đã gia nhập server!`);
      }
    });
  }
};
