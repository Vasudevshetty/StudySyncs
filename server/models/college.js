const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "College must have a name"],
    minLength: [3, "College must be at least 3 characters long"],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [10, "Description must be at least 10 characters long"],
  },
  bgImgUrl: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("College", collegeSchema);
