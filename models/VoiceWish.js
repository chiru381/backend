const mongoose = require('mongoose')

const voiceWishSchema = new mongoose.Schema({

    name: String,

    relation: String,

    audioUrl: String,

    duration: Number,

    message: String,

    profileImage: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('VoiceWish', voiceWishSchema)