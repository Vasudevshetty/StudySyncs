const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Every course must have a name"],
  },
  slug: String,
  bgImgUrl: String,
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: [true, "Every course must be of a college"],
  },
  description: {
    type: String,
    require: [true, "Every course must have a description"],
  },
  semesters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
