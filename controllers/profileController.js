const Profile = require('../models/Profile')

// ================= CREATE PROFILE =================
exports.createProfile = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      bio,
      address,
      profileImage
    } = req.body

    const profile = await Profile.create({
      userId,
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      bio,
      address,
      profileImage
    })

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL PROFILES =================
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE PROFILE =================
exports.getSingleProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('userId', 'name email')

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    res.status(200).json({
      success: true,
      data: profile
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE PROFILE =================
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id)

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}