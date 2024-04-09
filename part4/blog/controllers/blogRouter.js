const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    await blog.save()
    response.status(201).json(blog)
})
blogsRouter.delete('/:id', async (req, res, next) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})
blogsRouter.put('/:id', async (req, res) => {
    const { likes } = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { likes },
        { new: true, runValidators: true, context: 'query' }
    );
    res.status(201).json(updatedBlog)
});

module.exports = { blogsRouter }