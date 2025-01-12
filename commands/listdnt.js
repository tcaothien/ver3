const { MessageEmbed } = require('discord.js');
const User = require('../models/User'); // Mô hình người dùng

module.exports = {
  name: 'listdnt',
  description: 'Hiển thị top 10 người dùng donate nhiều nhất.',
  async execute(message) {
    // Kiểm tra quyền của người dùng
    if (!message.member.roles.cache.some(role => ['1291261923001765948', '1313801586916462613', '1285915798308651021'].includes(role.id))) {
      return message.reply('Bạn không có quyền sử dụng lệnh này!');
    }

    // Lấy top 10 người dùng với số điểm donate cao nhất
    const topDonators = await User.find().sort({ points: -1 }).limit(10);
    if (topDonators.length === 0) {
      return message.reply('Không có ai trong top donate.');
    }

    // Tạo embed để hiển thị danh sách top 10 người dùng donate
    const embed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Top 10 Người Dùng Donate Nhiều Nhất');

    topDonators.forEach((user, index) => {
      embed.addField(`${index + 1}. Người dùng ${user.userId}`, `${user.points} điểm`);
    });

    message.channel.send({ embeds: [embed] });
  }
};
