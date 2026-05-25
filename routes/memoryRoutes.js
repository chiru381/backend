const express = require('express')
const router = express.Router()

const memoryController = require('../controllers/memoryController')

router.post('/', memoryController.createMemory)

router.get('/', memoryController.getMemories)

router.get('/:id', memoryController.getSingleMemory)

router.put('/:id', memoryController.updateMemory)

router.delete('/:id', memoryController.deleteMemory)

module.exports = router