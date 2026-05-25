const express = require('express')
const router = express.Router()

const settingController = require('../controllers/settingController')

router.post('/', settingController.createSetting)

router.get('/', settingController.getSettings)

router.put('/:id', settingController.updateSetting)

module.exports = router