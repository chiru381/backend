const mongoose = require('mongoose')

const appLockSchema = new mongoose.Schema({

    pin: String,

    fingerprintEnabled: {
        type: Boolean,
        default: false
    },

    faceLockEnabled: {
        type: Boolean,
        default: false
    },

    voiceLockEnabled: {
        type: Boolean,
        default: false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('AppLock', appLockSchema)