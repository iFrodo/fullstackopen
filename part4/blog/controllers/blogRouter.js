const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})

notesRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    await blog.save()
    response.status(201).json(blog)
})

module.exports = { notesRouter }