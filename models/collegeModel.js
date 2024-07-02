const mongoose = require("mongoose");
const Course = require("./SubjectModel");

const collegeSchema = new mongoose.Schema({
  name: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("College", courseSchema);
