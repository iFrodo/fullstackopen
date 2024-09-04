import { useSelector, useDispatch } from 'react-redux'
import { addNewAnecdote, voteFor } from './reducers/anecdoteReducer'
import Anecdote from './components/Anecdote'
import Anecdotes from './components/Anecdotes'

const App = () => {
  const anecdotes = useSelector(state => state)




  return (
    <div>

      <Anecdotes anecdotes={anecdotes} />

      <Anecdote />
    </div>
  )
}

export default App