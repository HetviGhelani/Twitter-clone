const Bookmark = require("../models/Bookmark");
const Tweet = require("../models/Tweet");

// @desc    Bookmark a tweet
// @route   POST /api/bookmarks/:tweetId
exports.bookmarkTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);
    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: "Tweet not found",
      });
    }

    const existingBookmark = await Bookmark.findOne({
      user: req.user.id,
      tweet: req.params.tweetId,
    });

    if (existingBookmark) {
      return res.status(400).json({
        success: false,
        message: "Tweet already bookmarked",
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user.id,
      tweet: req.params.tweetId,
    });

    res.status(201).json({
      success: true,
      data: bookmark,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove bookmark
// @route   DELETE /api/bookmarks/:tweetId
exports.removeBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user.id,
      tweet: req.params.tweetId,
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    res.json({
      success: true,
      message: "Bookmark removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user bookmarks
// @route   GET /api/bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .populate({
        path: "tweet",
        populate: {
          path: "author",
          select: "name username profilePicture isVerified",
        },
      })
      .sort("-createdAt");

    res.json({
      success: true,
      data: bookmarks.map((b) => b.tweet),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
