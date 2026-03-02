const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  sendMessage,
  getConversation,
  getConversations,
  markAsRead,
} = require("../controllers/messageController");

router.use(protect);

router.route("/").post(sendMessage);

router.route("/conversations").get(getConversations);

router.route("/conversation/:userId").get(getConversation);

router.route("/:messageId/read").put(markAsRead);

module.exports = router;
