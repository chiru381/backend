const mongoose = require('mongoose')

const travelMemorySchema = new mongoose.Schema({

    title: String,

    description: String,

    location: String,

    latitude: Number,

    longitude: Number,

    photos: [String],

    videos: [String],

    travelDate: Date,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('TravelMemory', travelMemorySchema)