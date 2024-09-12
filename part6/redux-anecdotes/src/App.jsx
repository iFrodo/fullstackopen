import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import FilterForm from './components/FilterForm'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <FilterForm />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App