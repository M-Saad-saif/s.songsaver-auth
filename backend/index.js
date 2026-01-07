const express = require("express");
const cors = require("cors");
const connctToMongoDB = require("./db");

// making connection to mongoDB
connctToMongoDB();

const app = express();
app.use(cors());

// middleware to parse json body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
// app.use('/api/songs', require('./routes/songs'))

// checking health of server
app.get("/health", (req, res) => {
  res.send({ status: "OK", message: "server is running and healthy" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`backend is running on http://localhost:${port}`);
});
