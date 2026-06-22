const Upload = require('../models/Upload')
const Uploads = require('../models/Uploads')
const cloudinary = require('../config/cloudinary')

exports.uploadsFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File is required'
      })
    }

    const uploadData = await Uploads.create({
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.filename,
      fileType: req.file.mimetype
    })

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: uploadData
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPLOAD FILE =================
exports.uploadFile = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File is required'
      })
    }

    // Convert buffer to base64
    const fileBase64 =
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      fileBase64,
      {
        resource_type: 'auto',
        folder: 'travel_memory_uploads'
      }
    )

    // Save in MongoDB
    const uploadData = await Upload.create({
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileType: result.resource_type
    })

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: uploadData
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL FILES =================
exports.getUploads = async (req, res) => {
  try {

    const uploads = await Upload.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: uploads.length,
      data: uploads
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE FILE =================
exports.getSingleUpload = async (req, res) => {
  try {

    const upload = await Upload.findById(req.params.id)

    if (!upload) {
      return res.status(404).json({
        success: false,
        message: 'Upload not found'
      })
    }

    res.status(200).json({
      success: true,
      data: upload
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE FILE =================
exports.deleteUpload = async (req, res) => {
  try {

    const upload = await Upload.findById(req.params.id)

    if (!upload) {
      return res.status(404).json({
        success: false,
        message: 'Upload not found'
      })
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(
      upload.publicId,
      {
        resource_type: upload.fileType
      }
    )

    // Delete from MongoDB
    await Upload.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}