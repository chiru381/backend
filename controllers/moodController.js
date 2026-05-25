const Mood = require('../models/Mood')

// ================= CREATE MOOD =================
exports.createMood = async (req, res) => {
  try {
    const {
      mood,
      note,
      date,
      emoji,
      color
    } = req.body

    const newMood = await Mood.create({
      mood,
      note,
      date,
      emoji,
      color
    })

    res.status(201).json({
      success: true,
      message: 'Mood created successfully',
      data: newMood
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL MOODS =================
exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE MOOD =================
exports.getSingleMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id)

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: 'Mood not found'
      })
    }

    res.status(200).json({
      success: true,
      data: mood
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE MOOD =================
exports.updateMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: 'Mood not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Mood updated successfully',
      data: mood
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE MOOD =================
exports.deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndDelete(req.params.id)

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: 'Mood not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Mood deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}