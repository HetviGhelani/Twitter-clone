const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure one user can't bookmark same tweet twice
bookmarkSchema.index({ user: 1, tweet: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
