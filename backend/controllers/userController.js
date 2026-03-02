const User = require("../models/User");
const Tweet = require("../models/Tweet");

// @desc    Get user profile by username
// @route   GET /api/users/:username
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("-password")
      .populate("followers", "name username profilePicture")
      .populate("following", "name username profilePicture");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Get user's tweets
    const tweets = await Tweet.find({ author: user._id, isReply: false })
      .sort({ createdAt: -1 })
      .populate("author", "name username profilePicture isVerified")
      .populate("likes", "name username")
      .populate("retweets", "name username");

    res.json({
      success: true,
      data: {
        user,
        tweets,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, bio, location, website } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update fields
    user.name = name || user.name;
    user.bio = bio !== undefined ? bio : user.bio;
    user.location = location !== undefined ? location : user.location;
    user.website = website !== undefined ? website : user.website;

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        coverPicture: updatedUser.coverPicture,
        bio: updatedUser.bio,
        location: updatedUser.location,
        website: updatedUser.website,
        followers: updatedUser.followers,
        following: updatedUser.following,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search users
// @route   GET /api/users/search?q=query
// @access  Private
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ],
    })
      .select("name username profilePicture bio")
      .limit(10);

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  searchUsers,
};
