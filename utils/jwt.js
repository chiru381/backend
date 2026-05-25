// utils/jwt.js
const jwt = require('jsonwebtoken')

const ACCESS_SECRET = 'ACCESS_SECRET_KEY'
const REFRESH_SECRET = 'REFRESH_SECRET_KEY'

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    REFRESH_SECRET,
    { expiresIn: '30d' }
  )
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}