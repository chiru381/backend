const express = require('express')
const router = express.Router()

const calendarEventController = require('../controllers/calendarEventController')

router.post('/', calendarEventController.createCalendarEvent)

router.get('/', calendarEventController.getCalendarEvents)

router.get('/:id', calendarEventController.getSingleCalendarEvent)

router.put('/:id', calendarEventController.updateCalendarEvent)

router.delete('/:id', calendarEventController.deleteCalendarEvent)

module.exports = router