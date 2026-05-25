const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({

    title: String,

    description: String,

    selectedDate: Date,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Note', noteSchema)