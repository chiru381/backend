const mongoose = require('mongoose')

const calendarEventSchema = new mongoose.Schema({

    title: String,

    description: String,

    eventDate: Date,

    reminder: Boolean,

    color: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model(
    'CalendarEvent',
    calendarEventSchema
)