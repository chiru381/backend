const mongoose = require('mongoose')

const scrapbookSchema = new mongoose.Schema({

    title: String,

    description: String,

    coverImage: String,

    pages: [
        {
            image: String,
            note: String,
            sticker: String
        }
    ],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model(
    'Scrapbook',
    scrapbookSchema
)