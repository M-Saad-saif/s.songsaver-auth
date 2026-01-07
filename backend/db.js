const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/songsaving";

const connctToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to mongooDB successfully");
  } catch (error) {
    console.log(error.message, "connection to mongoo failed");
  }
};

module.exports = connctToMongoDB;
