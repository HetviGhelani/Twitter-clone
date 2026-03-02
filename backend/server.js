const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/database");
const path = require("path");
const fs = require("fs");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
const followRoutes = require("./routes/followRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Uploads folder created at:", uploadDir);
}

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Socket.io middleware for authentication
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const jwt = require("jsonwebtoken");
    const User = require("./models/User");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    console.error("Socket auth error:", error.message);
    next(new Error("Authentication error: Invalid token"));
  }
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.user?.username || "Unknown"}`);

  // Join user to their personal room
  if (socket.user) {
    socket.join(`user_${socket.user._id}`);
    console.log(
      `User ${socket.user.username} joined room user_${socket.user._id}`,
    );
  }

  // Handle new tweet
  socket.on("new-tweet", async (tweet) => {
    try {
      console.log(`New tweet from ${socket.user.username}:`, tweet._id);

      // Get user's followers
      const User = require("./models/User");
      const user = await User.findById(socket.user._id).populate("followers");

      // Emit to all followers
      const followers = user.followers || [];
      followers.forEach((follower) => {
        socket.to(`user_${follower._id}`).emit("new-tweet", tweet);
      });

      // Also emit to the author's own room (for multiple tabs)
      socket.to(`user_${socket.user._id}`).emit("new-tweet", tweet);
    } catch (error) {
      console.error("Socket error in new-tweet:", error);
    }
  });

  // Handle like notification
  socket.on("like-tweet", async ({ tweet, likedBy }) => {
    try {
      console.log(`${likedBy.username} liked tweet ${tweet._id}`);

      // Notify tweet author if different from liker
      if (tweet.author._id !== likedBy._id) {
        socket.to(`user_${tweet.author._id}`).emit("notification", {
          type: "like",
          user: likedBy,
          tweet: tweet,
          createdAt: new Date(),
          read: false,
        });
      }
    } catch (error) {
      console.error("Socket error in like-tweet:", error);
    }
  });

  // Handle retweet notification
  socket.on("retweet-tweet", async ({ tweet, retweetedBy }) => {
    try {
      console.log(`${retweetedBy.username} retweeted tweet ${tweet._id}`);

      // Notify tweet author if different from retweeter
      if (tweet.author._id !== retweetedBy._id) {
        socket.to(`user_${tweet.author._id}`).emit("notification", {
          type: "retweet",
          user: retweetedBy,
          tweet: tweet,
          createdAt: new Date(),
          read: false,
        });
      }
    } catch (error) {
      console.error("Socket error in retweet-tweet:", error);
    }
  });

  // Handle follow notification
  socket.on("follow-user", async ({ follower, following }) => {
    try {
      console.log(`${follower.username} followed ${following.username}`);

      socket.to(`user_${following._id}`).emit("notification", {
        type: "follow",
        user: follower,
        createdAt: new Date(),
        read: false,
      });
    } catch (error) {
      console.error("Socket error in follow-user:", error);
    }
  });

  // Handle reply notification
  socket.on("reply-tweet", async ({ originalTweet, reply, repliedBy }) => {
    try {
      console.log(
        `${repliedBy.username} replied to tweet ${originalTweet._id}`,
      );

      // Notify original tweet author if different from replier
      if (originalTweet.author._id !== repliedBy._id) {
        socket.to(`user_${originalTweet.author._id}`).emit("notification", {
          type: "reply",
          user: repliedBy,
          tweet: reply,
          originalTweet: originalTweet,
          createdAt: new Date(),
          read: false,
        });
      }
    } catch (error) {
      console.error("Socket error in reply-tweet:", error);
    }
  });

  // Handle typing indicator
  socket.on("typing", ({ recipientId, isTyping }) => {
    socket.to(`user_${recipientId}`).emit("typing", {
      user: {
        _id: socket.user._id,
        name: socket.user.name,
        username: socket.user.username,
      },
      isTyping,
    });
  });

  // Handle private messages
  socket.on("private-message", async ({ recipientId, message }) => {
    try {
      console.log(
        `Private message from ${socket.user.username} to user_${recipientId}`,
      );

      const messageData = {
        _id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        sender: {
          _id: socket.user._id,
          name: socket.user.name,
          username: socket.user.username,
          profilePicture: socket.user.profilePicture,
        },
        content: message,
        createdAt: new Date(),
      };

      // Send to recipient
      socket.to(`user_${recipientId}`).emit("private-message", messageData);

      // Send back to sender for confirmation
      socket.emit("message-sent", messageData);
    } catch (error) {
      console.error("Socket error in private-message:", error);
    }
  });

  // Handle read receipts
  socket.on("mark-read", ({ messageIds, conversationWith }) => {
    socket.to(`user_${conversationWith}`).emit("messages-read", {
      messageIds,
      readBy: socket.user._id,
      readAt: new Date(),
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`🔌 User disconnected: ${socket.user?.username || "Unknown"}`);

    // Notify others that user went offline
    if (socket.user) {
      socket.broadcast.emit("user-offline", {
        userId: socket.user._id,
        username: socket.user.username,
      });
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// Body parser with increased limit for images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Enable CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Logging middleware (for development)
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/upload", uploadRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date(),
    uploadsDir: fs.existsSync(uploadDir),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.url} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);

  // Handle multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File too large. Maximum size is 5MB",
    });
  }

  if (err.message && err.message.includes("image files")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadDir}`);
  console.log(`🖼️  Upload URL: http://localhost:${PORT}/uploads/`);
  console.log(`💓 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 Socket.io server ready\n`);
});
