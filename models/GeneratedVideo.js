const mongoose = require("mongoose");

const generatedVideoSchema =
new mongoose.Schema(
{
  images: [
    {
      type: String,
      required: true
    }
  ],

  musicUrl: {
    type: String,
    required: true
  },

  slideType: {
    type: String,
    enum: [
      "fade",
      "left",
      "right",
      "zoom",
      "kenburns"
    ],
    default: "fade"
  },

  videoUrl: {
    type: String,
    required: true
  },

  publicId: {
    type: String
  }
},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "GeneratedVideo",
  generatedVideoSchema
);