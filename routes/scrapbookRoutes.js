const express = require('express')
const router = express.Router()

const scrapbookController = require('../controllers/scrapbookController')

router.post('/', scrapbookController.createScrapbook)

router.get('/', scrapbookController.getScrapbooks)

router.get('/:id', scrapbookController.getSingleScrapbook)

router.put('/:id', scrapbookController.updateScrapbook)

router.delete('/:id', scrapbookController.deleteScrapbook)

module.exports = router