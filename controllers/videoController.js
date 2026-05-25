const Video = require('../models/Video')

// ================= CREATE VIDEO =================
exports.createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      url,
      thumbnail,
      duration,
      category,
      tags
    } = req.body

    const video = await Video.create({
      title,
      description,
      url,
      thumbnail,
      duration,
      category,
      tags
    })

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: video
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL VIDEOS =================
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE VIDEO =================
exports.getSingleVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      })
    }

    res.status(200).json({
      success: true,
      data: video
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE VIDEO =================
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Video updated successfully',
      data: video
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE VIDEO =================
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id)

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}