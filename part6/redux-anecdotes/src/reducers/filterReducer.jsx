// reducers/filterReducer.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      setFilter(state,action) {
        console.log(action.payload)
        return action.payload
      }
    }
  
  })


// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.payload;
//         default:
//             return state;
//     }
// };

// export const setFilter = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         payload: filter,
//     };
// };
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer;
