const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { info, error } = require('./utils/logger')
require('express-async-errors')
const { notesRouter } = require('./controllers/blogRouter');
const { MONGODB_URI } = require('./utils/config')
const middleware = require('./utils/middleware')




const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl).then(result => info('mongodb connected'))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app