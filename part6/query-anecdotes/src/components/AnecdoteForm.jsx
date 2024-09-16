


const AnecdoteForm = ({newAnecdoteMutation}) => {

  const onCreate = (event) => {
    event.preventDefault()
    const anecdote = { content: event.target.anecdote.value, votes: 0 }
    newAnecdoteMutation.mutate(anecdote)
    event.target.anecdote.value = ''
    console.log('new anecdote')


  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
