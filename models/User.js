const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  deviceId: String,

  refreshToken: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
})

const userSchema = new mongoose.Schema({
  // ================= BASIC INFO =================

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  mobile: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  mpin: {
    type: String,
  },

  // ================= BIOMETRIC IDS =================

  fingerprintId: {
    type: String,
    default: null,
  },

  faceId: {
    type: String,
    default: null,
  },

  voiceId: {
    type: String,
    default: null,
  },

  // ================= SETTINGS =================

  biometricEnabled: {
    type: Boolean,
    default: false,
  },

  faceEnabled: {
    type: Boolean,
    default: false,
  },

  voiceEnabled: {
    type: Boolean,
    default: false,
  },

  // ================= SESSIONS =================

  sessions: [sessionSchema],

  // ================= PROFILE =================

  profileImage: {
    type: String,
    default: '',
  },

  // ================= CREATED =================

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', userSchema)