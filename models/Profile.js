const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({

    bio: String,

    relationshipDate: Date,

    favoriteSong: String,

    dreamPlace: String,

    hobbies: [String]

})

module.exports = mongoose.model('Profile', profileSchema)