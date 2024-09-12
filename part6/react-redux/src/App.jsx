import Notes from "./components/Notes"
import NewNoteForm from "./components/NewNoteForm"
import VisibilityFilter from "./components/VisibilitiFilter"
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { initializeNotes } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
 dispatch(initializeNotes())
  }, [dispatch])
  return (
    <div>
      <NewNoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App