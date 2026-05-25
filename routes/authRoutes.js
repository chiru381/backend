const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth') 
const authController = require('../controllers/authController')

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/login-mpin', authController.loginWithMPIN)

router.post('/login-fingerprint', authController.loginWithFingerprint)

router.post('/login-face', authController.loginWithFace)

router.post('/login-voice', authController.loginWithVoice)

router.post('/logout', authMiddleware, authController.logout)
router.post('/logout-all', authMiddleware, authController.logoutAll)

module.exports = router