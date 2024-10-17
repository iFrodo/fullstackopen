const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
// .populate('user', { content: 1, important: 1 })
// .populate('User', { login: 1, name: 1 })

commentsRouter.get('/', async (request, response, next) => {
    const comments = await Comment.find({})
    response.json(comments)
})
commentsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const comment = new Comment({
        content: body.content
    })
    const savedComment = await comment.save()
    response.status(201).json(savedComment)
})

module.exports = { commentsRouter }