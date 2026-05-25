const express = require('express')
const router = express.Router()

const appLockController = require('../controllers/appLockController')

router.post('/', appLockController.createAppLock)

router.get('/', appLockController.getAppLocks)

router.put('/:id', appLockController.updateAppLock)

module.exports = router