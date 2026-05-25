const Scrapbook = require('../models/Scrapbook')

// ================= CREATE SCRAPBOOK =================
exports.createScrapbook = async (req, res) => {
  try {
    const {
      title,
      description,
      coverImage,
      photos,
      videos,
      stickers,
      theme
    } = req.body

    const scrapbook = await Scrapbook.create({
      title,
      description,
      coverImage,
      photos,
      videos,
      stickers,
      theme
    })

    res.status(201).json({
      success: true,
      message: 'Scrapbook created successfully',
      data: scrapbook
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL SCRAPBOOKS =================
exports.getScrapbooks = async (req, res) => {
  try {
    const scrapbooks = await Scrapbook.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: scrapbooks.length,
      data: scrapbooks
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE SCRAPBOOK =================
exports.getSingleScrapbook = async (req, res) => {
  try {
    const scrapbook = await Scrapbook.findById(req.params.id)

    if (!scrapbook) {
      return res.status(404).json({
        success: false,
        message: 'Scrapbook not found'
      })
    }

    res.status(200).json({
      success: true,
      data: scrapbook
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE SCRAPBOOK =================
exports.updateScrapbook = async (req, res) => {
  try {
    const scrapbook = await Scrapbook.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!scrapbook) {
      return res.status(404).json({
        success: false,
        message: 'Scrapbook not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Scrapbook updated successfully',
      data: scrapbook
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE SCRAPBOOK =================
exports.deleteScrapbook = async (req, res) => {
  try {
    const scrapbook = await Scrapbook.findByIdAndDelete(req.params.id)

    if (!scrapbook) {
      return res.status(404).json({
        success: false,
        message: 'Scrapbook not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Scrapbook deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}