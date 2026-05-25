const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({

    darkMode: {
        type: Boolean,
        default: false
    },

    language: {
        type: String,
        default: 'English'
    },

    autoBackup: {
        type: Boolean,
        default: true
    },

    autoPlayVideos: {
        type: Boolean,
        default: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Setting', settingSchema)