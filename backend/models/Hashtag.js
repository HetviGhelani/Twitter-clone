const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  count: {
    type: Number,
    default: 1,
  },
  lastUsed: {
    type: Date,
    default: Date.now,
  },
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
});

module.exports = mongoose.model("Hashtag", hashtagSchema);
