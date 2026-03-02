const User = require("../models/User");
const Follow = require("../models/Follow");

// @desc    Follow a user
// @route   POST /api/follow/:userId
// @access  Private
const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);

    if (!userToFollow) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if trying to follow self
    if (userToFollow._id.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot follow yourself" });
    }

    // Check if already following
    const alreadyFollowing = await Follow.findOne({
      follower: req.user._id,
      following: userToFollow._id,
    });

    if (alreadyFollowing) {
      return res
        .status(400)
        .json({ success: false, message: "Already following this user" });
    }

    // Create follow relationship
    await Follow.create({
      follower: req.user._id,
      following: userToFollow._id,
    });

    // Update user documents
    await User.findByIdAndUpdate(req.user._id, {
      $push: { following: userToFollow._id },
    });

    await User.findByIdAndUpdate(userToFollow._id, {
      $push: { followers: req.user._id },
    });

    res.json({
      success: true,
      message: `You are now following ${userToFollow.name}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Unfollow a user
// @route   DELETE /api/follow/:userId
// @access  Private
const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.userId);

    if (!userToUnfollow) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Remove follow relationship
    await Follow.findOneAndDelete({
      follower: req.user._id,
      following: userToUnfollow._id,
    });

    // Update user documents
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: userToUnfollow._id },
    });

    await User.findByIdAndUpdate(userToUnfollow._id, {
      $pull: { followers: req.user._id },
    });

    res.json({
      success: true,
      message: `You have unfollowed ${userToUnfollow.name}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get follow suggestions
// @route   GET /api/follow/suggestions
// @access  Private
const getFollowSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("following");

    // Get users that the current user is not following
    const suggestions = await User.find({
      _id: {
        $ne: req.user._id,
        $nin: user.following.map((f) => f._id),
      },
    })
      .select("name username profilePicture bio")
      .limit(5)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowSuggestions,
};
