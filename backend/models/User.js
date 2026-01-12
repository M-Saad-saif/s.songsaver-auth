const mongoose = require("mongoose");
// const { default: UserProfile } = require("../../src/components/UserProfile");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepic:{
    type: String,
    default: '../uploads/Screenshot 2026-01-12 182242.png'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
