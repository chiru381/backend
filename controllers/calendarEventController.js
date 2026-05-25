const CalendarEvent = require('../models/CalenderEvent')

// ================= CREATE CALENDAR EVENT =================
exports.createCalendarEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      eventType
    } = req.body

    const calendarEvent = await CalendarEvent.create({
      title,
      description,
      startDate,
      endDate,
      location,
      eventType
    })

    res.status(201).json({
      success: true,
      message: 'Calendar event created successfully',
      data: calendarEvent
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL CALENDAR EVENTS =================
exports.getCalendarEvents = async (req, res) => {
  try {
    const calendarEvents = await CalendarEvent.find()
      .sort({ startDate: 1 })

    res.status(200).json({
      success: true,
      count: calendarEvents.length,
      data: calendarEvents
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE CALENDAR EVENT =================
exports.getSingleCalendarEvent = async (req, res) => {
  try {
    const calendarEvent = await CalendarEvent.findById(req.params.id)

    if (!calendarEvent) {
      return res.status(404).json({
        success: false,
        message: 'Calendar event not found'
      })
    }

    res.status(200).json({
      success: true,
      data: calendarEvent
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE CALENDAR EVENT =================
exports.updateCalendarEvent = async (req, res) => {
  try {
    const calendarEvent = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!calendarEvent) {
      return res.status(404).json({
        success: false,
        message: 'Calendar event not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Calendar event updated successfully',
      data: calendarEvent
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE CALENDAR EVENT =================
exports.deleteCalendarEvent = async (req, res) => {
  try {
    const calendarEvent = await CalendarEvent.findByIdAndDelete(req.params.id)

    if (!calendarEvent) {
      return res.status(404).json({
        success: false,
        message: 'Calendar event not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Calendar event deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}