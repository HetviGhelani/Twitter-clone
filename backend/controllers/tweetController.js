const Tweet = require("../models/Tweet");
const User = require("../models/User");

// @desc    Create a tweet
// @route   POST /api/tweets
// @access  Private
const createTweet = async (req, res) => {
  try {
    const { content, image, replyTo } = req.body;

    const tweet = await Tweet.create({
      content,
      image: image || null,
      author: req.user._id,
      replyTo: replyTo || null,
      isReply: !!replyTo,
    });

    const populatedTweet = await Tweet.findById(tweet._id)
      .populate("author", "name username profilePicture isVerified")
      .populate({
        path: "replyTo",
        populate: {
          path: "author",
          select: "name username profilePicture",
        },
      });

    res.status(201).json({
      success: true,
      data: populatedTweet,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all tweets (feed)
// @route   GET /api/tweets
// @access  Private
const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get tweets from users the current user follows + their own tweets
    const user = await User.findById(req.user._id);

    const tweets = await Tweet.find({
      $or: [
        { author: { $in: [...user.following, req.user._id] } },
        { isReply: false },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name username profilePicture isVerified")
      .populate({
        path: "replyTo",
        populate: {
          path: "author",
          select: "name username profilePicture",
        },
      })
      .populate("likes", "name username")
      .populate("retweets", "name username");

    const total = await Tweet.countDocuments({
      $or: [
        { author: { $in: [...user.following, req.user._id] } },
        { isReply: false },
      ],
    });

    res.json({
      success: true,
      data: {
        tweets,
        page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single tweet
// @route   GET /api/tweets/:id
// @access  Private
const getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
      .populate("author", "name username profilePicture isVerified")
      .populate("likes", "name username")
      .populate("retweets", "name username")
      .populate({
        path: "replyTo",
        populate: {
          path: "author",
          select: "name username profilePicture",
        },
      });

    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    res.json({
      success: true,
      data: tweet,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get tweet replies
// @route   GET /api/tweets/:id/replies
// @access  Private
const getReplies = async (req, res) => {
  try {
    const replies = await Tweet.find({ replyTo: req.params.id })
      .sort({ createdAt: -1 })
      .populate("author", "name username profilePicture isVerified")
      .populate("likes", "name username")
      .populate("retweets", "name username");

    res.json({
      success: true,
      data: replies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Like/Unlike a tweet
// @route   PUT /api/tweets/:id/like
// @access  Private
const likeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    // Check if already liked
    const isLiked = tweet.likes.includes(req.user._id);

    if (isLiked) {
      // Unlike
      tweet.likes = tweet.likes.filter(
        (id) => id.toString() !== req.user._id.toString(),
      );
    } else {
      // Like
      tweet.likes.push(req.user._id);
    }

    await tweet.save();

    res.json({
      success: true,
      data: {
        likes: tweet.likes,
        isLiked: !isLiked,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Retweet/Unretweet
// @route   PUT /api/tweets/:id/retweet
// @access  Private
const retweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    const isRetweeted = tweet.retweets.includes(req.user._id);

    if (isRetweeted) {
      // Remove retweet
      tweet.retweets = tweet.retweets.filter(
        (id) => id.toString() !== req.user._id.toString(),
      );
    } else {
      // Add retweet
      tweet.retweets.push(req.user._id);
    }

    await tweet.save();

    res.json({
      success: true,
      data: {
        retweets: tweet.retweets,
        isRetweeted: !isRetweeted,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a tweet
// @route   DELETE /api/tweets/:id
// @access  Private
const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: "Tweet not found",
      });
    }

    // Check if user is the author
    if (tweet.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own tweets",
      });
    }

    // Delete the tweet
    await tweet.deleteOne();

    // Also delete any replies to this tweet (optional)
    await Tweet.deleteMany({ replyTo: req.params.id });

    res.json({
      success: true,
      message: "Tweet deleted successfully",
    });
  } catch (error) {
    console.error("Delete tweet error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTweet,
  getFeed,
  getTweet,
  getReplies,
  likeTweet,
  retweet,
  deleteTweet,
};
