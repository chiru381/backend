const VoiceWish = require('../models/VoiceWish')

// ================= CREATE VOICE WISH =================
exports.createVoiceWish = async (req, res) => {
  try {
    const {
      title,
      message,
      audioUrl,
      senderName,
      receiverName,
      duration
    } = req.body

    const voiceWish = await VoiceWish.create({
      title,
      message,
      audioUrl,
      senderName,
      receiverName,
      duration
    })

    res.status(201).json({
      success: true,
      message: 'Voice wish created successfully',
      data: voiceWish
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL VOICE WISHES =================
exports.getVoiceWishes = async (req, res) => {
  try {
    const voiceWishes = await VoiceWish.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: voiceWishes.length,
      data: voiceWishes
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE VOICE WISH =================
exports.getSingleVoiceWish = async (req, res) => {
  try {
    const voiceWish = await VoiceWish.findById(req.params.id)

    if (!voiceWish) {
      return res.status(404).json({
        success: false,
        message: 'Voice wish not found'
      })
    }

    res.status(200).json({
      success: true,
      data: voiceWish
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE VOICE WISH =================
exports.updateVoiceWish = async (req, res) => {
  try {
    const voiceWish = await VoiceWish.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!voiceWish) {
      return res.status(404).json({
        success: false,
        message: 'Voice wish not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Voice wish updated successfully',
      data: voiceWish
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE VOICE WISH =================
exports.deleteVoiceWish = async (req, res) => {
  try {
    const voiceWish = await VoiceWish.findByIdAndDelete(req.params.id)

    if (!voiceWish) {
      return res.status(404).json({
        success: false,
        message: 'Voice wish not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Voice wish deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}