const AboutUs = require('../models/AboutUs')

// ================= CREATE ABOUT US =================
exports.createAboutUs = async (req, res) => {
  try {
    const {
      title,
      description,
      mission,
      vision,
      image
    } = req.body

    const aboutUs = await AboutUs.create({
      title,
      description,
      mission,
      vision,
      image
    })

    res.status(201).json({
      success: true,
      message: 'About Us created successfully',
      data: aboutUs
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ABOUT US =================
exports.getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne()

    res.status(200).json({
      success: true,
      data: aboutUs
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE ABOUT US =================
exports.updateAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!aboutUs) {
      return res.status(404).json({
        success: false,
        message: 'About Us not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'About Us updated successfully',
      data: aboutUs
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}