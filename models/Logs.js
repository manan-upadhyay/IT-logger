const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  tech: {
    type: String,
    required: true,
  },
  attention: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("logs", LogSchema);
