import Notes from "./components/Notes"
import NewNoteForm from "./components/NewNoteForm"
import VisibilityFilter from "./components/VisibilitiFilter"
import noteService from './services/notes'
import { useEffect } from 'react'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [])
  return (
    <div>
      <NewNoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App