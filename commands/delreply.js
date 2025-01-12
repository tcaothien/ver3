module.exports = {
  name: 'delreply',
  description: 'Xóa tin nhắc phản hồi tự động.',
  async execute(message, args) {
    // Kiểm tra quyền người dùng
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('Bạn không có quyền sử dụng lệnh này!');
    }

    const keyword = args[0];
    if (!keyword) {
      return message.reply('Vui lòng nhập từ khóa cần xóa!');
    }

    // Xóa từ khóa phản hồi
    const result = await deleteAutoReply(message.guild.id, keyword);
    if (result) {
      message.reply(`Đã xóa phản hồi cho từ khóa: "${keyword}"`);
    } else {
      message.reply('Không tìm thấy phản hồi với từ khóa này.');
    }
  }
};

