const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'listreply',
  description: 'Liệt kê tất cả phản hồi tự động.',
  async execute(message) {
    // Lấy tất cả phản hồi từ cơ sở dữ liệu
    const replies = await getAllReplies(message.guild.id);
    if (!replies || replies.length === 0) {
      return message.reply('Không có phản hồi tự động nào được tạo.');
    }

    const embed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Danh sách phản hồi tự động');

    replies.forEach(reply => {
      embed.addField(reply.keyword, reply.response);
    });

    message.channel.send({ embeds: [embed] });
  }
};
