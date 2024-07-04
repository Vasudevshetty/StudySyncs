const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/test"));

module.exports = app;
