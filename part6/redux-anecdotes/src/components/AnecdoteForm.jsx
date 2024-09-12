import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import anecdoteService from "../services/anecdoteService"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (e) => {
        e.preventDefault()
        let inputValue = e.target.newAnecdote.value
        dispatch(addNewAnecdote(inputValue))
        e.target.newAnecdote.value = ''
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="newAnecdote" /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}
export default AnecdoteForm