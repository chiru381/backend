const Notification = require('../models/Notification')

// ================= CREATE NOTIFICATION =================
exports.createNotification = async (req, res) => {
  try {
    const {
      title,
      message,
      type,
      userId,
      isRead
    } = req.body

    const notification = await Notification.create({
      title,
      message,
      type,
      userId,
      isRead
    })

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL NOTIFICATIONS =================
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE NOTIFICATION =================
exports.getSingleNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate('userId', 'name email')

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      })
    }

    res.status(200).json({
      success: true,
      data: notification
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE NOTIFICATION =================
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Notification updated successfully',
      data: notification
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE NOTIFICATION =================
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id)

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}