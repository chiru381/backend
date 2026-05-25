const mongoose = require('mongoose')

const notificationSettingSchema = new mongoose.Schema({

    pushNotification: {
        type: Boolean,
        default: true
    },

    anniversaryReminder: {
        type: Boolean,
        default: true
    },

    birthdayReminder: {
        type: Boolean,
        default: true
    },

    travelReminder: {
        type: Boolean,
        default: false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model(
    'NotificationSetting',
    notificationSettingSchema
)