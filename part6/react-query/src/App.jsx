import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import noteService from './services/noteService'
import { useEffect } from 'react'



const App = () => {
  const queryClient = useQueryClient()


  const newNoteMutation = useMutation({
    mutationFn: noteService.create,
    onSuccess: (newNote) => {
    
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const importanceMutation = useMutation({
    mutationFn: noteService.toggleImportance, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  }
  )

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: () => noteService.getAll(),
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const notes = result.data

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    newNoteMutation.mutate({ content, important: true })
    event.target.note.value = ''
    console.log(content)
  }

  const toggleImportance = (note) => {
    const updatedNote = { ...note, important: !note.important }
    importanceMutation.mutate(updatedNote)

  }



  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App