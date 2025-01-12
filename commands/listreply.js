const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'listreply',
  description: 'Liệt kê tất cả tin nhắc phản hồi',
  async execute(message) {
    const replies = await getRepliesFromDB(); // Tải danh sách phản hồi từ database
    const embed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Danh sách phản hồi tự động')
      .setDescription(replies.join('\n'));

    message.channel.send({ embeds: [embed] });
  }
};

