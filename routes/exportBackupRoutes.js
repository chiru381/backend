const express = require('express')
const router = express.Router()

const exportBackupController = require('../controllers/exportBackupController')

router.post('/export', exportBackupController.exportData)

router.post('/import', exportBackupController.importData)

router.get('/', exportBackupController.getBackups)

module.exports = router