const express = require('express')
const router = express.Router()

const notificationSettingController = require('../controllers/notificationSettingController')

router.post('/', notificationSettingController.createNotificationSetting)

router.get('/', notificationSettingController.getNotificationSettings)

router.put('/:id', notificationSettingController.updateNotificationSetting)

module.exports = router