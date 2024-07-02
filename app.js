const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const collegeRoutes = require("./routes/collegeRoutes");
const courseRoutes = require("./routes/courseRoutes");
const semesterRoutes = require("./routes/semesterRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const moduleRoutes = require("./routes/moduleRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/colleges", collegeRoutes);
app.use("/courses", courseRoutes);
app.use("/semesters", semesterRoutes);
app.use("/subjects", subjectRoutes);
app.use("/modules", moduleRoutes);

module.exports = app;
