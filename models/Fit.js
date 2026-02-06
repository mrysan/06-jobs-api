const mongoose = require("mongoose");

const FitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      minlength: 6,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    images: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Fit", FitSchema);
