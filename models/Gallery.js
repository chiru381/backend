const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({

    title: String,

    imageUrl: String,

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

module.exports = mongoose.model('Gallery', gallerySchema)