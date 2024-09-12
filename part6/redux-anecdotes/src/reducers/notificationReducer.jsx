
import { createSlice, current } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotify(state, action) {
      return `voted for ${action.payload.content}`
    },
    removeNotify(state, action) {
      return ''
    }
  }

})
export const setNotification = (content, timer) => {
  const timerInSec = timer * 1000
  return async (dispatch) => {
    dispatch(setNotify(content));
    setTimeout(() => {
      dispatch(removeNotify());
    }, timerInSec);
  };
};

export const { setNotify, removeNotify } = notificationSlice.actions
export default notificationSlice.reducer