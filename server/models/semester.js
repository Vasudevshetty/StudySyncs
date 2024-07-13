const mongoose = require("mongoose");

const semesterSchema = mongoose.Schema({
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
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
});

module.exports = mongoose.model("Semester", semesterSchema);
