const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  lastTarotTime: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
