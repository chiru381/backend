const mongoose = require('mongoose')

const exportBackupSchema = new mongoose.Schema({

    fileName: String,

    fileUrl: String,

    backupType: String,

    status: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model(
    'ExportBackup',
    exportBackupSchema
)