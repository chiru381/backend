const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["image", "video"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Upload", uploadSchema);