import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          data-testid='addNoteInput'
          onChange={event => setNewNote(event.target.value)}
        />
        <button data-testid='addNoteBtn' type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm