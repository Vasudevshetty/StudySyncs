const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Every course must have a name"],
  },
  description: {
    type: String,
    require: [true, "Every course must have a description"],
  },
  semesters: [
    {
      number: {
        type: Number,
        required: [true, "Semester number is required"],
      },
      subjects: [
        {
          name: {
            type: String,
            required: [true, "Every subject has a name"],
          },
          code: {
            type: String,
            required: [true, "Subject code is a required field"],
          },
          modules: [String],
        },
      ],
    },
  ],
});

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "College must have a name"],
    minLength: [3, "College must be at least 3 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [10, "Description must be at least 10 characters long"],
  },
  courses: [courseSchema],
});

module.exports = mongoose.model("College", collegeSchema);
