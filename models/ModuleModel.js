const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  name: String,
  resources: [
    {
      type: String,
      link: String,
    },
  ],
});

module.exports = mongoose.model("Module", moduleSchema);
