const express = require("express");
const cors = require("cors");
const path = require("path");
const connctToMongoDB = require("./db");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// making connection to mongoDB
connctToMongoDB();

const app = express();
app.use(cors());

// middleware to parse json body
app.use(express.json());

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/songs", require("./routes/songs"));

// checking health of server
app.get("/health", (req, res) => {
  res.send({ status: "OK", message: "server is running and healthy" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`backend is running on http://localhost:${port}`);
});
