const notesRouter = require('express').Router()
const Note = require('../models/Note')


notesRouter.get('/', async (req, res, error) => {
    const notes = await Note.find({}).then(
        (notes) => {
            if (notes) {
                res.json(notes);
            }
        }
    ).catch(error => next(error))
})
notesRouter.get('/:id', async (req, res, next) => {
    const note = await Note.findById(req.params.id)
        .then((note) => {
            if (note) {
                res.json(note)
            } else res.status(404).end()
        })
        .catch((error) => {
            next(error)
        })
})
notesRouter.post('/', async (req, res) => {
    const note = new Note({
        content: req.body.content,
        important: req.body.important
    });
    const savedNote = await note.save();
    res.json(savedNote);
})
notesRouter.put('/:id', async (req, res) => {
    const { content, important } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    );
    if (updatedNote) {
        res.json(updatedNote)
    }
});
notesRouter.delete('/:id', async (req, res, next) => {
    await Note.findByIdAndDelete(req.params.id)
        .then(async (result) => {
            res.json(await Note.find({}))
            res.status(204).end
        }
        ).catch(error => next(error))
})

module.exports = notesRouter