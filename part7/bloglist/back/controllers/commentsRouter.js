const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
// .populate('user', { content: 1, important: 1 })
// .populate('User', { login: 1, name: 1 })

commentsRouter.post('/', async (req, res) => {
    const { blogId, text, author } = req.body;
    const comment = new Comment({ blogId, text, author });
    console.log(comment)
    await comment.save();
    res.status(201).json(comment);
});

// Получение комментариев для конкретной записи
commentsRouter.get('/comments/:blogId', async (req, res) => {
    const comments = await Comment.find({ postId: req.params.blogtId });
    res.json(comments);
});

module.exports = { commentsRouter }