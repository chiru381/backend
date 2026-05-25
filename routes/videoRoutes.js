const express = require('express')
const router = express.Router()

const videoController = require('../controllers/videoController')

router.post('/', videoController.createVideo)

router.get('/', videoController.getVideos)

router.get('/:id', videoController.getSingleVideo)

router.put('/:id', videoController.updateVideo)

router.delete('/:id', videoController.deleteVideo)

module.exports = router