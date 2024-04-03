const express = require('express')
const cors = require('cors')
const app = express()

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]
app.use(express.json())
app.use(cors())
app.get('/', (request, response) => {
    response.send(`<h1>Hello express</h1>`)
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
    try {
        const id = Number(request.params.id)
        const note = notes.find(note => note.id === id)
        if (note) {

            response.json(note)
        } else {
            response.statusMessage = "Note is not defined";
            response.status(404).end('Note not found')
        }
    } catch (error) {
        response.status(500).end(error)
    }


})
const genereteID = (notes) => {
    return notes.length + 1
}
app.post('/api/notes/', (request, response) => {
    try {
        if (!request.body) {
            return response.status(400).json({
                error: 'content missing'
            })
        }
        const note = {
            id: genereteID(notes),
            content: request.body.content,
            important: Boolean(request.body.important) || false
        }
        notes = notes.concat(note)
        response.json(notes)
    } catch (error) {
        response.status(500).end(error)
    }
})


app.delete('/api/notes/:id', (request, response) => {
    try {
        const id = Number(request.params.id)

        if (id) {
            notes = notes.filter(note => note.id !== id)

            response.status(204).end('deleted')

        } else {
            response.statusMessage = "Note is not defined";
            response.status(404).end('Note not found')
        }
    } catch (error) {
        response.status(500).end(error)
    }
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`server start at ${PORT} port`);
})
