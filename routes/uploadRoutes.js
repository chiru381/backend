const express = require('express')
const router = express.Router()
const multer = require('multer')

const uploadController = require('../controllers/uploadController')

const storage = multer.memoryStorage()

const upload = multer({
  storage
})

const uploads = require('../utils/multer')

router.post(
  '/uploads',
  uploads.single('file'),
  uploadController.uploadsFile
)

// ================= UPLOAD FILE =================
router.post(
  '/',
  upload.single('file'),
  uploadController.uploadFile
)

// ================= GET ALL FILES =================
router.get(
  '/',
  uploadController.getUploads
)

// ================= GET SINGLE FILE =================
router.get(
  '/:id',
  uploadController.getSingleUpload
)

// ================= DELETE FILE =================
router.delete(
  '/:id',
  uploadController.deleteUpload
)

module.exports = router