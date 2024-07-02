const mongoose = require("mongoose");
const Subject = require("./SubjectModel");

const semesterSchema = new mongoose.Schema({
  number: Number,
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

module.exports = mongoose.model("Semester", semesterSchema);
