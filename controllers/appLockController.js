const AppLock = require('../models/AppLock')

// ================= CREATE APP LOCK =================
exports.createAppLock = async (req, res) => {
  try {
    const {
      userId,
      lockType,
      mpin,
      fingerprintEnabled,
      faceEnabled,
      voiceEnabled
    } = req.body

    const appLock = await AppLock.create({
      userId,
      lockType,
      mpin,
      fingerprintEnabled,
      faceEnabled,
      voiceEnabled
    })

    res.status(201).json({
      success: true,
      message: 'App Lock created successfully',
      data: appLock
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL APP LOCKS =================
exports.getAppLocks = async (req, res) => {
  try {
    const appLocks = await AppLock.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: appLocks.length,
      data: appLocks
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE APP LOCK =================
exports.updateAppLock = async (req, res) => {
  try {
    const appLock = await AppLock.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!appLock) {
      return res.status(404).json({
        success: false,
        message: 'App Lock not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'App Lock updated successfully',
      data: appLock
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}