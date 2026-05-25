const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      mpin,
      fingerprintId,
      faceId,
      voiceId,
    } = req.body

    // ================= CHECK EXISTING USER =================

    const existingUser = await User.findOne({
      $or: [
        { email },
        { mobile }
      ]
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email or mobile number already exists',
      })
    }

    // ================= HASH PASSWORD =================

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    // ================= HASH MPIN =================

    let hashedMPIN = null

    if (mpin) {
      hashedMPIN = await bcrypt.hash(mpin, salt)
    }

    // ================= CREATE USER =================

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      mpin: hashedMPIN,
      fingerprintId,
      faceId,
      voiceId,
    })

    // ================= TOKEN =================

    const token = generateToken(user._id)

    // ================= RESPONSE =================

    res.status(201).json({
      success: true,
      message: 'User registered successfully',

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// ================= LOGIN WITH EMAIL & PASSWORD =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= LOGIN WITH MPIN =================
exports.loginWithMPIN = async (req, res) => {
  try {
    const { mobile, mpin } = req.body

    // Find user by phone number
    const user = await User.findOne({
      mobile: mobile,
    })

    // Check user and mpin exists
    if (!user || !user.mpin) {
      return res.status(404).json({
        success: false,
        message: 'MPIN login not available',
      })
    }

    // Compare mpin
    const isMatch = await bcrypt.compare(
      mpin,
      user.mpin
    )

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid MPIN',
      })
    }

    // Generate token
    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'MPIN login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// ================= LOGIN WITH FINGERPRINT =================
exports.loginWithFingerprint = async (req, res) => {
  try {
    const { fingerprintId } = req.body

    const user = await User.findOne({ fingerprintId })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Fingerprint not recognized'
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Fingerprint login successful',
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= LOGIN WITH FACE =================
exports.loginWithFace = async (req, res) => {
  try {
    const { faceId } = req.body

    const user = await User.findOne({ faceId })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Face not recognized'
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Face login successful',
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= LOGIN WITH VOICE =================
exports.loginWithVoice = async (req, res) => {
  try {
    const { voiceId } = req.body

    const user = await User.findOne({ voiceId })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Voice not recognized'
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Voice login successful',
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= LOGOUT CURRENT DEVICE =================
exports.logout = async (req, res) => {
  try {
    const userId = req.user.id   // from auth middleware
    const deviceId = req.body.deviceId

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // deactivate only this device session
    user.sessions = user.sessions.map(session => {
      if (session.deviceId === deviceId) {
        return { ...session.toObject(), isActive: false }
      }
      return session
    })

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Logged out from current device'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= LOGOUT ALL DEVICES =================
exports.logoutAll = async (req, res) => {
  try {
    const userId = req.user.id

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    user.sessions = user.sessions.map(session => ({
      ...session.toObject(),
      isActive: false
    }))

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Logged out from all devices'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}