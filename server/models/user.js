const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A resource must have a title"],
  },
  url: {
    type: String,
    required: [true, "A resource must have a URL"],
  },
  type: {
    type: String,
    enum: ["bookmark", "download"],
    required: [true, "A resource must have a type"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Other fields related to the resource can go here
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "/img/guest.png",
  },
  coverPhoto: {
    type: String,
    default: "/img/cover.png",
  },
  college: {
    type: String,
    required: [true, "Please provide your college"],
  },
  course: {
    type: String,
    required: [true, "Please provide your course"],
  },
  currentSemester: {
    type: String,
    required: [true, "Please provide your current semester"],
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  bookmarks: [resourceSchema],
  downloads: [resourceSchema],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
