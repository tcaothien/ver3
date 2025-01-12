module.exports = {
  name: 'adddnt',
  description: 'Cộng điểm donate cho người dùng.',
  async execute(message, args) {
    // Kiểm tra quyền của người dùng
    if (!message.member.roles.cache.some(role => ['1291261923001765948', '1313801586916462613', '1285915798308651021'].includes(role.id))) {
      return message.reply('Bạn không có quyền sử dụng lệnh này!');
    }

    const userId = args[0];
    const points = parseInt(args[1]);

    if (!userId || isNaN(points)) {
      return message.reply('Vui lòng cung cấp ID người dùng và số điểm hợp lệ!');
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return message.reply('Người dùng này không tồn tại!');
    }

    user.points += points;
    await user.save();

    message.reply(`Đã cộng ${points} điểm cho ${userId}.`);
  }
};
