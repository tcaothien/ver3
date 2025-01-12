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

    let reply = 'Top 10 người dùng donate nhiều nhất:\n';
    topDonators.forEach((user, index) => {
      reply += `${index + 1}. ${user.userId} - ${user.points} điểm\n`;
    });

    message.channel.send(reply);
  }
};
