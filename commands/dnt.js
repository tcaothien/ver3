module.exports = {
  name: 'dnt',
  description: 'Hiển thị điểm của người dùng.',
  async execute(message) {
    const userId = message.author.id;
    const user = await User.findOne({ userId });

    if (!user) {
      return message.reply('Bạn chưa có điểm nào!');
    }

    const embed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle(`Điểm của ${message.author.tag}`)
      .setDescription(`Điểm của bạn: ${user.points}`);

    message.channel.send({ embeds: [embed] });
  }
};
