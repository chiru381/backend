const ExportBackup = require('../models/ExportBackup')

// ================= EXPORT DATA =================
exports.exportData = async (req, res) => {
  try {
    const {
      fileName,
      fileUrl,
      fileType,
      exportedBy
    } = req.body

    const backup = await ExportBackup.create({
      fileName,
      fileUrl,
      fileType,
      exportedBy,
      action: 'EXPORT'
    })

    res.status(201).json({
      success: true,
      message: 'Data exported successfully',
      data: backup
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= IMPORT DATA =================
exports.importData = async (req, res) => {
  try {
    const {
      fileName,
      fileUrl,
      fileType,
      importedBy
    } = req.body

    const backup = await ExportBackup.create({
      fileName,
      fileUrl,
      fileType,
      importedBy,
      action: 'IMPORT'
    })

    res.status(201).json({
      success: true,
      message: 'Data imported successfully',
      data: backup
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL BACKUPS =================
exports.getBackups = async (req, res) => {
  try {
    const backups = await ExportBackup.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: backups.length,
      data: backups
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}