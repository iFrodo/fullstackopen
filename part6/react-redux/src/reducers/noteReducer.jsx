const initialState = [
  {
    notes: [
      { content: 'reducer defines how redux store works', important: true, id: 1 },
      { content: 'state of store can contain any data', important: false, id: 2 }
    ],
    filter: 'IMPORTANT'
  }
]


//редюсер получает стейт, получает action, что-то делает , и возвращает измененную копию стейта
const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    default:
      return state
  }
}


const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

//action creater создает экш для редюсера 
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}
//action creater создает экш для редюсера 
export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

export default noteReducer