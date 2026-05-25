const mongoose = require('mongoose')

const peopleAlbumSchema = new mongoose.Schema({

    personName: String,

    relationship: String,

    profileImage: String,

    photos: [String],

    videos: [String],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model(
    'PeopleAlbum',
    peopleAlbumSchema
)