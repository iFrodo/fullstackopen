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

export const initializeUser = () => async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('user');

    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);

        // Проверка, истек ли токен
        if (isTokenExpired(user.token)) {
            // Удаляем пользователя из localStorage
            window.localStorage.removeItem('user');
            // Очищаем куки, если они используются
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            return;
        }

        // Если токен валидный, устанавливаем пользователя и токен
        dispatch(setUser(user));
        blogService.setToken(user.token);
    }
};

// Функция для проверки, истек ли токен
const isTokenExpired = (token) => {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        return decodedToken.exp < currentTime;
    } catch (error) {
        // Если произошла ошибка при декодировании токена, считаем его истекшим
        return true;
    }
};

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