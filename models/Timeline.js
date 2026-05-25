const mongoose = require('mongoose')

const timelineSchema = new mongoose.Schema({

    title: String,

    description: String,

    image: String,

    eventDate: Date,

    location: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Timeline', timelineSchema)