// src/reducers/userReducer.js
import {createSlice} from '@reduxjs/toolkit';
import loginService from "../services/loginService.js";
import blogService from "../services/blogService.js";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state, action) {
            return null
        }
    }
})

export const {setUser, clearUser} = userSlice.actions

export const initializeUser = ()=>
    async dispatch =>{
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }

    }

export const loginUser =  (credentials) =>
     async dispatch => {
        const response = await loginService.login(credentials);
        blogService.setToken(response.token);
        window.localStorage.setItem('user', JSON.stringify(response));
        dispatch(setUser(response));
}

export const removeUser =  () =>
    async dispatch => {
        window.localStorage.removeItem('user')
        dispatch(clearUser());
    }
export default userSlice.reducer