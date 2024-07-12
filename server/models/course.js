const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Every course must have a name"],
  },
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
          modules: [
            {
              number: {
                type: Number,
                required: [true, "Module number is required"],
              },
              name: {
                type: String,
                required: [true, "Every module must have a name"],
              },
            },
          ],
        },
      ],
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
