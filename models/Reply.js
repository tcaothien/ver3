const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
