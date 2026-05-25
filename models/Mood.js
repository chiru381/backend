const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({

    mood: String,

    note: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Mood', moodSchema)