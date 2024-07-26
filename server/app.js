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

const authController = require("./controllers/authController");

dotenv.config({ path: "./config.env" });

const app = express();

const corsOptions = {
  // eslint-disable-next-line
  origin: [process.env.FRONTEND_URL_PROD, process.env.FRONTEND_URL_DEV], // Add your frontend URLs here
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/colleges", collegeRoutes);
app.use("/api/v1/courses", courseRoutes);

app.use("/api/v1/semesters", authController.protect, semesterRoutes);
// app.use("/api/v1/semesters", semesterRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find the requested url ${req.url}`,
  });
});

module.exports = app;
