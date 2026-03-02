const express = require("express");
const router = express.Router();
const {
  followUser,
  unfollowUser,
  getFollowSuggestions,
} = require("../controllers/followController");
const { protect } = require("../middleware/auth");

router.get("/suggestions", protect, getFollowSuggestions);
router.post("/:userId", protect, followUser);
router.delete("/:userId", protect, unfollowUser);

module.exports = router;
