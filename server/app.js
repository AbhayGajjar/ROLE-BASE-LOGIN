// server.js

const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const router = require("./routers/authRouter");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/v1", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
