const WeddingMovie = require('../models/WeddingMovie')

// ================= CREATE WEDDING MOVIE =================
exports.createWeddingMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      brideName,
      groomName,
      date,
      location,
      videoUrl,
      thumbnail,
      photos,
      duration
    } = req.body

    const weddingMovie = await WeddingMovie.create({
      title,
      description,
      brideName,
      groomName,
      date,
      location,
      videoUrl,
      thumbnail,
      photos,
      duration
    })

    res.status(201).json({
      success: true,
      message: 'Wedding movie created successfully',
      data: weddingMovie
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL WEDDING MOVIES =================
exports.getWeddingMovies = async (req, res) => {
  try {
    const weddingMovies = await WeddingMovie.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: weddingMovies.length,
      data: weddingMovies
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE WEDDING MOVIE =================
exports.getSingleWeddingMovie = async (req, res) => {
  try {
    const weddingMovie = await WeddingMovie.findById(req.params.id)

    if (!weddingMovie) {
      return res.status(404).json({
        success: false,
        message: 'Wedding movie not found'
      })
    }

    res.status(200).json({
      success: true,
      data: weddingMovie
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE WEDDING MOVIE =================
exports.updateWeddingMovie = async (req, res) => {
  try {
    const weddingMovie = await WeddingMovie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!weddingMovie) {
      return res.status(404).json({
        success: false,
        message: 'Wedding movie not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Wedding movie updated successfully',
      data: weddingMovie
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE WEDDING MOVIE =================
exports.deleteWeddingMovie = async (req, res) => {
  try {
    const weddingMovie = await WeddingMovie.findByIdAndDelete(req.params.id)

    if (!weddingMovie) {
      return res.status(404).json({
        success: false,
        message: 'Wedding movie not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Wedding movie deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}