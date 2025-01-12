module.exports = {
  name: 'dnt',
  description: 'Hiển thị điểm của người dùng',
  async execute(message) {
    const user = message.author;
    const userData = await User.findOne({ userId: user.id });

    if (!userData) {
      return message.reply('Bạn chưa có điểm nào!');
    }

    message.reply(`Điểm của bạn là: ${userData.points}`);
  }
};

