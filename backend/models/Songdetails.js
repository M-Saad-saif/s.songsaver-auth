const mongoose = require("mongoose");
const { Schema } = mongoose;

const SongSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  songName: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("song", SongSchema);
