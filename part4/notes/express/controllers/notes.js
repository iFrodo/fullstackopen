const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


notesRouter.get('/', async (req, res, next) => {
    const notes = await Note.find({}).populate('user', { login: 1, name: 1 });
    res.json(notes);
})
notesRouter.get('/:id', async (req, res, next) => {
    const note = await Note.findById(req.params.id)
    res.json(note)
})
notesRouter.post('/', async (req, res) => {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const note = new Note({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.json(savedNote)
})
notesRouter.put('/:id', async (req, res) => {
    const { content, important } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    );
    res.json(updatedNote)
});
notesRouter.delete('/:id', async (req, res, next) => {
    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = notesRouter