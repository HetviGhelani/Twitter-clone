const Message = require("../models/Message");
const User = require("../models/User");

// @desc    Send a message
// @route   POST /api/messages
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content, attachments } = req.body;

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: "Recipient not found",
      });
    }

    const message = await Message.create({
      sender: req.user.id,
      recipients: [recipientId],
      content,
      attachments,
      readBy: [req.user.id],
    });

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name username profilePicture")
      .populate("recipients", "name username profilePicture");

    // Emit socket event
    const io = req.app.get("io");
    io.to(`user_${recipientId}`).emit("newMessage", populatedMessage);

    res.status(201).json({
      success: true,
      data: populatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get conversation with user
// @route   GET /api/messages/conversation/:userId
exports.getConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipients: req.params.userId },
        { sender: req.params.userId, recipients: req.user.id },
      ],
    })
      .populate("sender", "name username profilePicture")
      .populate("recipients", "name username profilePicture")
      .sort("createdAt");

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all conversations
// @route   GET /api/messages/conversations
exports.getConversations = async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: req.user._id }, { recipients: req.user._id }],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", req.user._id] },
              { $arrayElemAt: ["$recipients", 0] },
              "$sender",
            ],
          },
          lastMessage: { $first: "$$ROOT" },
        },
      },
    ]);

    const populatedMessages = await Message.populate(messages, {
      path: "lastMessage.sender lastMessage.recipients _id",
      select: "name username profilePicture",
    });

    res.json({
      success: true,
      data: populatedMessages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:messageId/read
exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { $addToSet: { readBy: req.user.id } },
      { new: true },
    );

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
