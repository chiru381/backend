const mongoose = require('mongoose')

const uploadsSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true
    },

    fileName: {
      type: String,
      required: true
    },

    fileType: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Uploads', uploadsSchema)