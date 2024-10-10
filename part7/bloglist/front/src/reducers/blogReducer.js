import {createSlice} from '@reduxjs/toolkit';
import blogService from "../services/blogService.js";

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        setBlog(state, action) {
            state.push(action.payload)

        },
        deleteBlog(state, action) {
            return state.filter(el => el.id !== action.payload.id)
        }
    }
})

export const {setBlogs, setBlog, deleteBlog} = blogsSlice.actions

export const initializeBlogs = () => async (dispatch )=> {
   const blogs =  await blogService.getAll()
    dispatch(setBlogs(blogs))
}
export const createBlog = (newBlog) => async dispatch => {
    await blogService.create(newBlog).then(res => dispatch(setBlog(res)))
}
export const removeBlog = (blog) => async dispatch => {
    await blogService.remove(blog.id).then(() => {
        dispatch(deleteBlog(blog.id))
    })
}
export default blogsSlice.reducer