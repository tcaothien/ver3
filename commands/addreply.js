module.exports = {
  name: 'addreply',
  description: 'Thêm tin nhắc phản hồi tự động',
  async execute(message, args) {
    const replyMessage = args.join(' ');
    // Lưu tin nhắc vào cơ sở dữ liệu hoặc cấu hình bot
    message.reply(`Đã thêm phản hồi: "${replyMessage}"`);
  }
};

