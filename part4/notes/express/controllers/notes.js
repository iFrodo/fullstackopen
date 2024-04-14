const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


notesRouter.get('/', async (req, res, next) => {
    const notes = await Note.find({}).populate('user', { login: 1, name: 1 });
    res.json(notes);
})
notesRouter.get('/:id', async (req, res, next) => {
    const note = await Note.findById(req.params.id)
    res.json(note)
})
notesRouter.post('/', async (req, res, next) => {
    const user = await User.findById(req.body.userId)
    console.log(req.body)
    const note = new Note({
        content: req.body.content,
        important: req.body.important,
        user: user.id
    });
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.status(201).json(savedNote);
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