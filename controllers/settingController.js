const Setting = require('../models/Setting')

// ================= CREATE SETTING =================
exports.createSetting = async (req, res) => {
  try {
    const {
      userId,
      theme,
      language,
      darkMode,
      autoBackup,
      privacyMode
    } = req.body

    const setting = await Setting.create({
      userId,
      theme,
      language,
      darkMode,
      autoBackup,
      privacyMode
    })

    res.status(201).json({
      success: true,
      message: 'Setting created successfully',
      data: setting
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL SETTINGS =================
exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: settings.length,
      data: settings
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE SETTING =================
exports.updateSetting = async (req, res) => {
  try {
    const setting = await Setting.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Setting updated successfully',
      data: setting
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}