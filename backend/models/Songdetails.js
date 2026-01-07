const mongoose = require("mongoose");
const { Schema } = mongoose;

const SongSchema = new Schema({
  songName: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model('song', SongSchema);
