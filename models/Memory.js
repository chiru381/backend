const mongoose = require('mongoose')

const memorySchema = new mongoose.Schema({

    title: String,

    description: String,

    memoryType: String,

    mediaUrl: String,

    thumbnail: String,

    tags: [String],

    favorite: {
        type: Boolean,
        default: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Memory', memorySchema)