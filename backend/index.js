const express = require("express");
const cors = require("cors");
const path = require("path");
const connctToMongoDB = require("./db");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = express();

// making connection to mongoDB
connctToMongoDB();

// front end urls allowed to access backend
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://s-songsaver-auth.vercel.app",
// ];

app.use(
  cors({
    origin: "*", // Allow ALL origins for now
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    // credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "auth-token",
      "X-Requested-With",
    ],
  })
);

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
