const Memory = require('../models/Memory')

// ================= CREATE MEMORY =================
exports.createMemory = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      videos,
      date,
      location,
      tags
    } = req.body

    const memory = await Memory.create({
      title,
      description,
      images,
      videos,
      date,
      location,
      tags
    })

    res.status(201).json({
      success: true,
      message: 'Memory created successfully',
      data: memory
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL MEMORIES =================
exports.getMemories = async (req, res) => {
  try {
    const memories = await Memory.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: memories.length,
      data: memories
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE MEMORY =================
exports.getSingleMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id)

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found'
      })
    }

    res.status(200).json({
      success: true,
      data: memory
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE MEMORY =================
exports.updateMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Memory updated successfully',
      data: memory
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE MEMORY =================
exports.deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id)

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Memory deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}