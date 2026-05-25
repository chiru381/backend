const express = require('express')
const router = express.Router()

const peopleAlbumController = require('../controllers/peopleAlbumController')

router.post('/', peopleAlbumController.createPeopleAlbum)

router.get('/', peopleAlbumController.getPeopleAlbums)

router.get('/:id', peopleAlbumController.getSinglePeopleAlbum)

router.put('/:id', peopleAlbumController.updatePeopleAlbum)

router.delete('/:id', peopleAlbumController.deletePeopleAlbum)

module.exports = router