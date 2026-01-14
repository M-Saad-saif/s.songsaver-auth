const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGODB_URL || "mongodb://localhost:27017/songsaving";

const connctToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to mongooDB successfully");
    
    // Check if we're connected to MongoDB Atlas or local
    const host = mongoose.connection.host;
    if (host.includes("mongodb.net")) {
      console.log(" Connected to: MongoDB Atlas (Cloud)");
    } else {
      console.log(" Connected to: Local MongoDB");
    }
  } catch (error) {
    console.log(error.message, "connection to mongoo failed");
  }
};

module.exports = connctToMongoDB;
