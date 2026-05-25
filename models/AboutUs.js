const mongoose = require('mongoose')

const aboutUsSchema = new mongoose.Schema({

    appName: String,

    version: String,

    description: String,

    email: String,

    mobile: String,

    website: String

})

module.exports = mongoose.model('AboutUs', aboutUsSchema)