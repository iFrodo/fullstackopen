const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
// .populate('user', { content: 1, important: 1 })
// .populate('User', { login: 1, name: 1 })


blogsRouter.get('/', async (request, response, next) => {
    console.log(request.user)
    const blogs = await Blog.find({}).populate('user', { login: 1, name: 1 })
    response.json(blogs)


})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: decodedToken.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})
blogsRouter.delete('/:id', async (req, res, next) => {

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(req.params.id)
    if (decodedToken.id === blog.user.toString()) {
        await Blog.findByIdAndDelete(req.params.id)
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