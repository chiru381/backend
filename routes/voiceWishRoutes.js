const express = require('express')
const router = express.Router()

const voiceWishController = require('../controllers/voiceWishController')

router.post('/', voiceWishController.createVoiceWish)

router.get('/', voiceWishController.getVoiceWishes)

router.get('/:id', voiceWishController.getSingleVoiceWish)

router.put('/:id', voiceWishController.updateVoiceWish)

router.delete('/:id', voiceWishController.deleteVoiceWish)

module.exports = router