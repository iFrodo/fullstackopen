const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { info, error } = require('./utils/logger')
require('express-async-errors')
const { blogsRouter } = require('./controllers/blogRouter');
const { usersRouter } = require('./controllers/usersRouter')
const { MONGODB_URI } = require('./utils/config')
const middleware = require('./utils/middleware')



mongoose.set('strictQuery', false)
const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl).then(result => info('mongodb connected'))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
// app.use('/api/users', usersRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app