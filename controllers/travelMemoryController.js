const TravelMemory = require('../models/TravelMemory')

// ================= CREATE TRAVEL MEMORY =================
exports.createTravelMemory = async (req, res) => {
  try {
    const {
      title,
      description,
      country,
      city,
      date,
      images,
      videos,
      rating,
      tags
    } = req.body

    const travelMemory = await TravelMemory.create({
      title,
      description,
      country,
      city,
      date,
      images,
      videos,
      rating,
      tags
    })

    res.status(201).json({
      success: true,
      message: 'Travel memory created successfully',
      data: travelMemory
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL TRAVEL MEMORIES =================
exports.getTravelMemories = async (req, res) => {
  try {
    const travelMemories = await TravelMemory.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: travelMemories.length,
      data: travelMemories
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE TRAVEL MEMORY =================
exports.getSingleTravelMemory = async (req, res) => {
  try {
    const travelMemory = await TravelMemory.findById(req.params.id)

    if (!travelMemory) {
      return res.status(404).json({
        success: false,
        message: 'Travel memory not found'
      })
    }

    res.status(200).json({
      success: true,
      data: travelMemory
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE TRAVEL MEMORY =================
exports.updateTravelMemory = async (req, res) => {
  try {
    const travelMemory = await TravelMemory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!travelMemory) {
      return res.status(404).json({
        success: false,
        message: 'Travel memory not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Travel memory updated successfully',
      data: travelMemory
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE TRAVEL MEMORY =================
exports.deleteTravelMemory = async (req, res) => {
  try {
    const travelMemory = await TravelMemory.findByIdAndDelete(req.params.id)

    if (!travelMemory) {
      return res.status(404).json({
        success: false,
        message: 'Travel memory not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Travel memory deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}