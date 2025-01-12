module.exports = {
  name: 'listdnt',
  description: 'Hiển thị top 10 donate',
  async execute(message) {
    if (!message.member.roles.cache.some(role => ['1291261923001765948', '1313801586916462613', '1285915798308651021'].includes(role.id))) {
      return message.reply('Bạn không có quyền sử dụng lệnh này!');
    }

    const topDonators = await User.find().sort({ points: -1 }).limit(10);
    if (topDonators.length === 0) {
      return message.reply('Không có người dùng nào trong bảng xếp hạng donate.');
    }

    const leaderboard = topDonators.map((user, index) => `${index + 1}. ${user.userId} - ${user.points} điểm`).join('\n');

    message.reply(`**Top 10 người donate**\n${leaderboard}`);
  }
};

