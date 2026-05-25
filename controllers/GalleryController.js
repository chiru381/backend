const Gallery = require('../models/Gallery')

// ================= CREATE GALLERY =================
exports.createGallery = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      category
    } = req.body

    const gallery = await Gallery.create({
      title,
      description,
      images,
      category
    })

    res.status(201).json({
      success: true,
      message: 'Gallery created successfully',
      data: gallery
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL GALLERIES =================
exports.getGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: galleries.length,
      data: galleries
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE GALLERY =================
exports.getSingleGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      })
    }

    res.status(200).json({
      success: true,
      data: gallery
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE GALLERY =================
exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Gallery updated successfully',
      data: gallery
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE GALLERY =================
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id)

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Gallery deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}