const mongoose = require('mongoose')

const weddingMovieSchema = new mongoose.Schema({

    title: String,

    videoUrl: String,

    thumbnail: String,

    musicName: String,

    duration: Number,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('WeddingMovie', weddingMovieSchema)