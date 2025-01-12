module.exports = {
  name: 'addreply',
  description: 'Thêm tin nhắc phản hồi tự động.',
  async execute(message, args) {
    // Kiểm tra quyền người dùng
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('Bạn không có quyền sử dụng lệnh này!');
    }

    // Nhập từ khóa và phản hồi
    const [keyword, ...response] = args;
    if (!keyword || !response.length) {
      return message.reply('Vui lòng nhập từ khóa và phản hồi!');
    }

    const reply = response.join(' ');

    // Lưu vào cơ sở dữ liệu
    await addAutoReply(message.guild.id, keyword, reply);

    message.reply(`Đã thêm phản hồi tự động cho từ khóa: "${keyword}"`);
  }
};
