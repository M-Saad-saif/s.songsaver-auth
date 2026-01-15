const express = require("express");
const cors = require("cors");
const path = require("path");
const connctToMongoDB = require("./db");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = express();

// making connection to mongoDB
connctToMongoDB();

app.use(
  cors({
    origin: "*", // Allowign aLL origins for now
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
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
