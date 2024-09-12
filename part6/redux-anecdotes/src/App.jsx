import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import FilterForm from './components/FilterForm'
import anecdoteService from './services/anecdoteService'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
useEffect(()=>{
anecdoteService.getAll().then((anecdotes)=>{dispatch(setAnecdotes(anecdotes))})
})
  return (
    <div>
      <FilterForm />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App