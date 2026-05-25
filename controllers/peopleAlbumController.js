const PeopleAlbum = require('../models/PeopleAlbum')

// ================= CREATE PEOPLE ALBUM =================
exports.createPeopleAlbum = async (req, res) => {
  try {
    const {
      personName,
      description,
      photos,
      videos,
      coverImage,
      tags
    } = req.body

    const peopleAlbum = await PeopleAlbum.create({
      personName,
      description,
      photos,
      videos,
      coverImage,
      tags
    })

    res.status(201).json({
      success: true,
      message: 'People album created successfully',
      data: peopleAlbum
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL PEOPLE ALBUMS =================
exports.getPeopleAlbums = async (req, res) => {
  try {
    const peopleAlbums = await PeopleAlbum.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: peopleAlbums.length,
      data: peopleAlbums
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE PEOPLE ALBUM =================
exports.getSinglePeopleAlbum = async (req, res) => {
  try {
    const peopleAlbum = await PeopleAlbum.findById(req.params.id)

    if (!peopleAlbum) {
      return res.status(404).json({
        success: false,
        message: 'People album not found'
      })
    }

    res.status(200).json({
      success: true,
      data: peopleAlbum
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE PEOPLE ALBUM =================
exports.updatePeopleAlbum = async (req, res) => {
  try {
    const peopleAlbum = await PeopleAlbum.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!peopleAlbum) {
      return res.status(404).json({
        success: false,
        message: 'People album not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'People album updated successfully',
      data: peopleAlbum
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE PEOPLE ALBUM =================
exports.deletePeopleAlbum = async (req, res) => {
  try {
    const peopleAlbum = await PeopleAlbum.findByIdAndDelete(req.params.id)

    if (!peopleAlbum) {
      return res.status(404).json({
        success: false,
        message: 'People album not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'People album deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}