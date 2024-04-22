const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// .populate('user', { content: 1, important: 1 })
// .populate('User', { login: 1, name: 1 })


blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user', { login: 1, name: 1 })
    response.json(blogs)


})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: request.user.id
    })

    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()

    response.status(201).json(savedBlog)
})
blogsRouter.delete('/:id', async (request, res, next) => {

    const blog = await Blog.findById(request.params.id)
    if (request.user.id === blog.user.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        res.status(204).json(blog + ' was succesfully deleted').end()
    } else {
        res.status(400).end('no permition')
    }

    // await Blog.findByIdAndDelete(req.params.id)

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