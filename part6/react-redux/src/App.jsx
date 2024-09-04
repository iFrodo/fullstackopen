import Notes from "./components/Notes"
import NewNoteForm from "./components/NewNoteForm"
import VisibilityFilter from "./components/VisibilitiFilter"


const App = () => {

  return (
    <div>
      <NewNoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App