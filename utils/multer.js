const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Create folders if not exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

if (!fs.existsSync('uploads/images')) {
  fs.mkdirSync('uploads/images')
}

if (!fs.existsSync('uploads/videos')) {
  fs.mkdirSync('uploads/videos')
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, 'uploads/images')
    } else if (file.mimetype.startsWith('video')) {
      cb(null, 'uploads/videos')
    } else {
      cb(null, 'uploads')
    }
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        '-' +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    )
  }
})

const uploads = multer({ storage })

module.exports = uploads