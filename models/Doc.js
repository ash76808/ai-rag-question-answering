const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Doc", DocSchema);
