const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  imageLink: { type: String, required: true },
  numLikes: { type: Number, required: true },
  user: { type: String, required: true },
  rank: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('picture', pictureSchema);
