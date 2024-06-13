const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please Enter your full name"],
    },
    email: {
      type: String,
      required: [true, "please Enter your full name"],
    },
    phone: {
      type: String,
      required: [true, "please Enter your full name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", contactSchema);
