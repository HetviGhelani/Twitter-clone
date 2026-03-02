const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  username: {
    type: String,
    required: [true, "Please add a username"],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [20, "Username cannot be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  bio: {
    type: String,
    maxlength: [160, "Bio cannot be more than 160 characters"],
    default: "",
  },
  location: {
    type: String,
    maxlength: [30, "Location cannot be more than 30 characters"],
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/demo/image/upload/v1/default_profile.png",
  },
  coverPicture: {
    type: String,
    default:
      "https://res.cloudinary.com/demo/image/upload/v1/default_cover.png",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
