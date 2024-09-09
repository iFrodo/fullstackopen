
import {createSlice,current } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state,action) {
        console.log(action.payload)
     return `voted for ${action.payload.content}`
    },
    removeNotify(state,action) {
       return ''
    }
  }

})


export const { notify,removeNotify} = notificationSlice.actions
export default notificationSlice.reducer