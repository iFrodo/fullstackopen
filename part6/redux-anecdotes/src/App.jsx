import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import FilterForm from './components/FilterForm'
const App = () => {

  return (
    <div>
      <FilterForm />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App