import { useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"

const Anecdotes = ({ anecdotes }) => {
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(voteFor(id))
    }
    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Anecdotes