import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './service/anecdoteService'
import { useContext, useReducer } from 'react'

const App = () => {
  const queryClient = useQueryClient()


  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SET":
        return action.payload
      case "UNSET":
        return ''
      default:
        return state
    }
  }
  const [notification, dispatchNofication] = useReducer(notificationReducer, '')


  const { status, data, error } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => anecdoteService.getAll(),
    refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      dispatchNofication({ type: "SET", payload: `Added new anecdote: ${newAnecdote.content}` })
      setTimeout(() => { dispatchNofication({ type: "UNSET" }) }, 5000)
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const voteMutation = useMutation({
    mutationFn: anecdoteService.vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    dispatchNofication({ type: "SET", payload: `Registred vote for : ${anecdote.content}` })
    setTimeout(() => { dispatchNofication({ type: "UNSET" }) }, 5000)
  }
  if (status === 'loading') {
    return <div>loading data...</div>
  }
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }
  const anecdotes = data || []

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification notification={notification} />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
