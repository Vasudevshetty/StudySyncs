const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const collegeRoutes = require("./routes/collegeRoutes");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(morgan("dev"));

app.use("/api/v1/colleges", collegeRoutes);
// app.use("/api", require("./routes/test"));

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find the requested url ${req.url}`,
  });
});

module.exports = app;
