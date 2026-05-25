const express = require('express')
const router = express.Router()

const aboutUsController = require('../controllers/aboutUsController')

router.post('/', aboutUsController.createAboutUs)

router.get('/', aboutUsController.getAboutUs)

router.put('/:id', aboutUsController.updateAboutUs)

module.exports = router