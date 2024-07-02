const mongoose = require("mongoose");
const Module = require("./moduleModel");

const subjectSchema = new mongoose.Schema({
  name: String,
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
