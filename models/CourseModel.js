const mongoose = require("mongoose");
const Semester = require("./SubjectModel");

const courseSchema = new mongoose.Schema({
  name: String,
  semesters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
