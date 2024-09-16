import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './service/anecdoteService'

const App = () => {
  const queryClient = useQueryClient()

  const { status, data, error } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => anecdoteService.getAll(),
    refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
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
    console.log('vote')
    voteMutation.mutate(anecdote)
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

      <Notification />
      <AnecdoteForm newNoteMutation={newAnecdoteMutation} />

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
