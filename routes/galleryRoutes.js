const express = require('express')
const router = express.Router()

const galleryController = require('../controllers/galleryController')

router.post('/', galleryController.createGallery)

router.get('/', galleryController.getGallery)

router.get('/:id', galleryController.getSingleGallery)

router.put('/:id', galleryController.updateGallery)

router.delete('/:id', galleryController.deleteGallery)

module.exports = router