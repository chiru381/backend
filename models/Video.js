const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({

    title: String,

    description: String,

    videoUrl: String,

    thumbnail: String,

    duration: Number,

    category: String,

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Video', videoSchema)