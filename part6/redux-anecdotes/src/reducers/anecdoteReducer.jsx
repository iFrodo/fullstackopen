
import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE":
//       let id = action.payload.id
//       let anecdoteToFind = state.find(anecdote => anecdote.id === id)
//       let changedAnecdote = {
//         ...anecdoteToFind,
//         votes: anecdoteToFind.votes + 1
//       }
//       return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
//     case "NEWANECDOTE":
//       let newAnecdote = asObject(action.payload.content)
//       return state.concat(newAnecdote)
//     default:
//       return state;
//   }

// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      let id = action.payload.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload)
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }

})
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdoteService)
    dispatch(setAnecdotes(anecdotes))
  }
}
export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createOne(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.vote(content)
    dispatch(voteFor(newAnecdote))
  }
}

// export const voteFor = (id) => {
//   return (
//     {
//       type: "VOTE",
//       payload: {
//         id: id
//       }
//     }
//   )
// }
// export const addNewAnecdote = (inputValue) => {
//   return (
//     {
//       type: "NEWANECDOTE",
//       payload: {
//         content: inputValue
//       }
//     }
//   )
// }
export const { voteFor, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer