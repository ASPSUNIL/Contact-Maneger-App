const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter username"],
    },

    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: [true, "email alrady added"],
    },

    password: {
      type: String,
      required: [true, "enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
