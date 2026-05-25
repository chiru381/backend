const express = require('express')
const router = express.Router()

const timelineController = require('../controllers/timelineController')

router.post('/', timelineController.createTimeline)

router.get('/', timelineController.getTimeline)

router.get('/:id', timelineController.getSingleTimeline)

router.put('/:id', timelineController.updateTimeline)

router.delete('/:id', timelineController.deleteTimeline)

module.exports = router