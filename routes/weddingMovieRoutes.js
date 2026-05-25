const express = require('express')
const router = express.Router()

const weddingMovieController = require('../controllers/weddingMovieController')

router.post('/', weddingMovieController.createWeddingMovie)

router.get('/', weddingMovieController.getWeddingMovies)

router.get('/:id', weddingMovieController.getSingleWeddingMovie)

router.put('/:id', weddingMovieController.updateWeddingMovie)

router.delete('/:id', weddingMovieController.deleteWeddingMovie)

module.exports = router