const Note = require('../models/Note')

// ================= CREATE NOTE =================
exports.createNote = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      tags,
      color,
      pinned
    } = req.body

    const note = await Note.create({
      title,
      description,
      category,
      tags,
      color,
      pinned
    })

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET ALL NOTES =================
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= GET SINGLE NOTE =================
exports.getSingleNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      })
    }

    res.status(200).json({
      success: true,
      data: note
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= UPDATE NOTE =================
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ================= DELETE NOTE =================
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}