const express = require('express')
const router = express.Router()

const travelMemoryController = require('../controllers/travelMemoryController')

router.post('/', travelMemoryController.createTravelMemory)

router.get('/', travelMemoryController.getTravelMemories)

router.get('/:id', travelMemoryController.getSingleTravelMemory)

router.put('/:id', travelMemoryController.updateTravelMemory)

router.delete('/:id', travelMemoryController.deleteTravelMemory)

module.exports = router