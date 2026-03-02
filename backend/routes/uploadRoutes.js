const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");
const fs = require("fs");

// Upload tweet image - store locally
router.post("/tweet", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("File uploaded:", req.file.filename);

    // Generate URL for the uploaded file
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      data: {
        url: imageUrl,
        filename: req.file.filename,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image",
    });
  }
});

// Upload profile picture - store locally
router.post(
  "/profile-picture",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const User = require("../models/User");
      const user = await User.findById(req.user._id);

      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

      // Update user profile picture
      user.profilePicture = imageUrl;
      await user.save();

      res.json({
        success: true,
        data: {
          url: imageUrl,
          filename: req.file.filename,
        },
      });
    } catch (error) {
      console.error("Profile picture upload error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to upload profile picture",
      });
    }
  },
);

// Upload cover photo - store locally
router.post(
  "/cover-photo",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const User = require("../models/User");
      const user = await User.findById(req.user._id);

      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

      // Update user cover photo
      user.coverPicture = imageUrl;
      await user.save();

      res.json({
        success: true,
        data: {
          url: imageUrl,
          filename: req.file.filename,
        },
      });
    } catch (error) {
      console.error("Cover photo upload error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to upload cover photo",
      });
    }
  },
);

module.exports = router;
