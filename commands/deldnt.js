module.exports = {
  name: 'deldnt',
  description: 'Trừ điểm donate cho người donate',
  async execute(message, args) {
    if (!message.member.roles.cache.some(role => ['1291261923001765948', '1313801586916462613', '1285915798308651021'].includes(role.id))) {
      return message.reply('Bạn không có quyền sử dụng lệnh này!');
    }

    const targetUser = message.mentions.users.first();
    if (!targetUser) return message.reply('Vui lòng chỉ định người dùng.');

    const pointsToRemove = parseInt(args[1], 10);
    if (isNaN(pointsToRemove)) return message.reply('Điểm trừ phải là một số hợp lệ.');

    const userData = await User.findOne({ userId: targetUser.id });
    if (!userData) {
      return message.reply('Người dùng này chưa tồn tại trong hệ thống.');
    }

    if (userData.points < pointsToRemove) {
      return message.reply('Điểm của người dùng không đủ để trừ.');
    }

    userData.points -= pointsToRemove;
    await userData.save();

    message.reply(`Đã trừ ${pointsToRemove} điểm cho ${targetUser.username}.`);
  }
};

