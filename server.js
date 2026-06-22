const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(
  '/uploads',
  express.static(
    path.join(__dirname, 'uploads')
  )
)

// ROUTES
const authRoutes = require('./routes/authRoutes')
const galleryRoutes = require('./routes/galleryRoutes')
const videoRoutes = require('./routes/videoRoutes')
const timelineRoutes = require('./routes/timelineRoutes')
const travelMemoryRoutes = require('./routes/travelMemoryRoutes')
const weddingMovieRoutes = require('./routes/weddingMovieRoutes')
const voiceWishRoutes = require('./routes/voiceWishRoutes')
const moodRoutes = require('./routes/moodRoutes')
const noteRoutes = require('./routes/noteRoutes')
const profileRoutes = require('./routes/profileRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const notificationSettingRoutes = require('./routes/notificationSettingRoutes')
const peopleAlbumRoutes = require('./routes/peopleAlbumRoutes')
const settingRoutes = require('./routes/settingRoutes')
const appLockRoutes = require('./routes/appLockRoutes')
const memoryRoutes = require('./routes/memoryRoutes')
const scrapbookRoutes = require('./routes/scrapbookRoutes')
const calendarEventRoutes = require('./routes/calendarEventRoutes')
const aboutUsRoutes = require('./routes/aboutUsRoutes')
const exportBackupRoutes = require('./routes/exportBackupRoutes')
const uploadRoutes = require("./routes/uploadRoutes");

const errorHandler = require('./middleware/errorHandler')

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// STATIC FOLDER
app.use('/uploads', express.static('uploads'))

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// DEFAULT ROUTE
app.get('/', (req, res) => {
    res.send('Wedding Gift API Working')
})

// ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/timeline', timelineRoutes)
app.use('/api/travel-memories', travelMemoryRoutes)
app.use('/api/wedding-movies', weddingMovieRoutes)
app.use('/api/voice-wishes', voiceWishRoutes)
app.use('/api/moods', moodRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/profiles', profileRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/notification-settings', notificationSettingRoutes)
app.use('/api/people-albums', peopleAlbumRoutes)
app.use('/api/settings', settingRoutes)
app.use('/api/app-lock', appLockRoutes)
app.use('/api/memories', memoryRoutes)
app.use('/api/scrapbooks', scrapbookRoutes)
app.use('/api/calendar-events', calendarEventRoutes)
app.use('/api/about-us', aboutUsRoutes)
app.use('/api/backups', exportBackupRoutes)
app.use("/api/upload", uploadRoutes);

app.use(errorHandler)

// SERVER
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})