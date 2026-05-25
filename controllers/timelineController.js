const Timeline = require('../models/Timeline')

// ================= CREATE TIMELINE =================
exports.createTimeline = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      images,
      videos,
      location,
      tags
    } = req.body

    const timeline = await Timeline.create({
      title,
      description,
      date,
      images,
      videos,
      location,
      tags
    })

    res.status(201).json({
      success: true,
      message: 'Timeline created successfully',
      data: timeline
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL TIMELINES =================
exports.getTimeline = async (req, res) => {
  try {
    const timelines = await Timeline.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: timelines.length,
      data: timelines
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE TIMELINE =================
exports.getSingleTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.findById(req.params.id)

    if (!timeline) {
      return res.status(404).json({
        success: false,
        message: 'Timeline not found'
      })
    }

    res.status(200).json({
      success: true,
      data: timeline
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE TIMELINE =================
exports.updateTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!timeline) {
      return res.status(404).json({
        success: false,
        message: 'Timeline not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Timeline updated successfully',
      data: timeline
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE TIMELINE =================
exports.deleteTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.findByIdAndDelete(req.params.id)

    if (!timeline) {
      return res.status(404).json({
        success: false,
        message: 'Timeline not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Timeline deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}