const NotificationSetting = require('../models/NotificationSetting')

// ================= CREATE NOTIFICATION SETTING =================
exports.createNotificationSetting = async (req, res) => {
  try {
    const {
      userId,
      pushNotification,
      emailNotification,
      smsNotification,
      sound,
      vibration
    } = req.body

    const notificationSetting = await NotificationSetting.create({
      userId,
      pushNotification,
      emailNotification,
      smsNotification,
      sound,
      vibration
    })

    res.status(201).json({
      success: true,
      message: 'Notification setting created successfully',
      data: notificationSetting
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL NOTIFICATION SETTINGS =================
exports.getNotificationSettings = async (req, res) => {
  try {
    const notificationSettings = await NotificationSetting.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: notificationSettings.length,
      data: notificationSettings
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE NOTIFICATION SETTING =================
exports.updateNotificationSetting = async (req, res) => {
  try {
    const notificationSetting = await NotificationSetting.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!notificationSetting) {
      return res.status(404).json({
        success: false,
        message: 'Notification setting not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Notification setting updated successfully',
      data: notificationSetting
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}