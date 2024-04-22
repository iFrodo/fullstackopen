const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { info, error } = require('./utils/logger')
require('express-async-errors')
const { blogsRouter } = require('./controllers/blogRouter');
const { usersRouter } = require('./controllers/usersRouter')
const { loginRouter } = require('./controllers/loginRouter')
const { MONGODB_URI } = require('./utils/config')
const middleware = require('./utils/middleware.js')




const mongoUrl = MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl).then(result => info('mongodb connected'))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app