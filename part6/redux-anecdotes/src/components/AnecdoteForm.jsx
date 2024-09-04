import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (e) => {
        e.preventDefault()
        const inputValue = e.target.newAnecdote.value
        dispatch(addNewAnecdote(inputValue))
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