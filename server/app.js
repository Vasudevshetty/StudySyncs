const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const collegeRoutes = require("./routes/collegeRoutes");
const courseRoutes = require("./routes/courseRoutes");
const semesterRoutes = require("./routes/semesterRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/colleges", collegeRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/semesters", semesterRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find the requested url ${req.url}`,
  });
});

module.exports = app;
