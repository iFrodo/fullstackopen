import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers  } from 'redux'
//проайдер передает стор приложению и подписывает его на изменения(вызывает ререндер)
import { Provider } from 'react-redux'


import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

// console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)