const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  bookmarkTweet,
  removeBookmark,
  getBookmarks,
} = require("../controllers/bookmarkController");

router.use(protect);

router.route("/").get(getBookmarks);

router.route("/:tweetId").post(bookmarkTweet).delete(removeBookmark);

module.exports = router;
