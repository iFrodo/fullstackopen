const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// .populate('user', { content: 1, important: 1 })
blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})

blogsRouter.post('/', async (request, response, next) => {
    const user = await User.findById(request.body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        userId: body.userId
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)

    response.status(201).json(savedBlog)
})
blogsRouter.delete('/:id', async (req, res, next) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})
blogsRouter.put('/:id', async (req, res, next) => {
    const { likes } = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { likes },
        { new: true, runValidators: true, context: 'query' }
    );
    res.status(201).json(updatedBlog)
});

module.exports = { blogsRouter }