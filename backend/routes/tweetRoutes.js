const express = require("express");
const router = express.Router();
const {
  createTweet,
  getFeed,
  getTweet,
  getReplies,
  likeTweet,
  retweet,
  deleteTweet,
} = require("../controllers/tweetController");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getFeed).post(protect, createTweet);

router.get("/:id", protect, getTweet);
router.get("/:id/replies", protect, getReplies);

router.route("/:id").delete(protect, deleteTweet);

router.put("/:id/like", protect, likeTweet);
router.put("/:id/retweet", protect, retweet);

router.delete('/:id', protect, deleteTweet);

module.exports = router;
