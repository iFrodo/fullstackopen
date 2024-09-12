import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]


const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))


//редюсер получает стейт, получает action, что-то делает , и возвращает измененную копию стейта
const noteSlice = createSlice({
  name: 'notes',
  initialState:[],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
      console.log(current(state))
    },
    toggleImportanceOf(state, action) {
      console.log(state)
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      console.log(state)
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    }, appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})
export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer