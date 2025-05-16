const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Schema for users

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z\s]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    profilePicture: String,
    address: {
      type: String,
      // required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },

    lastLogin: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
    balance: {
      type: String,
      required: [true, "A user must a balance"],
      default: "$0",
    },
    resetTokenExpiration: Date,
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.otp = function () {
  return crypto.randomInt(1000, 10000); // Random number between 1000-9999
};

const User = mongoose.model("User", userSchema);
module.exports = User;
