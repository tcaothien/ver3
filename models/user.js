const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  lastUsed: Number, // Thời gian sử dụng lệnh tarot gần nhất
  points: { type: Number, default: 0 }, // Điểm người dùng
});

module.exports = mongoose.model('User', userSchema);

