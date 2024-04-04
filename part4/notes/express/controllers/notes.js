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


// const noteId = req.params.id; //айдишка
// const note = notes.find(n => n.id === noteId); // ищем в массиве нотес запись с айдишкой придешдшей в запросе
// if (!note) {
//     return res.status(404).json({ error: 'Note not found' });
// }
// const newNote = { ...note, important: !note.important };  // потрошим спредом запись и меняем свойство на обратное
// notes = notes.map(n => (n.id === noteId ? newNote : n)); // берем массив notes  = notes.map (элемент массива notes => элемент ID === пришедшему в запросе ? подставь новую запись , или оставь старую)
// res.json(newNote);
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
    // notes = notes.filter(el => el.id !== req.params.id)
    // res.json(notes)
    await Note.findByIdAndDelete(req.params.id)
        .then(async (result) => {
            res.json(await Note.find({}))
            res.status(204).end
        }
        ).catch(error => next(error))
})

module.exports = notesRouter