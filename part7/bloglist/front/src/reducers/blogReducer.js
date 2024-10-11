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
        },
        updateBlogLikes(state, action) {
            const { id, likes } = action.payload;
            return state.map(blog => blog.id === id ? { ...blog, likes } : blog);
        }

    }
})

export const {setBlogs, setBlog, deleteBlog,updateBlogLikes} = blogsSlice.actions

export const initializeBlogs = () => async (dispatch) => {
    try {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    } catch (error) {
        console.error('Failed to fetch blogs:', error);

    }
};
export const createBlog = (newBlog) => async dispatch => {
    try {
        const response = await blogService.create(newBlog);
        dispatch(setBlog(response));
    } catch (error) {
        console.error('Failed to create blog:', error);

    }
};
export const removeBlog = (blog) => async dispatch => {
    try {
        await blogService.remove(blog.id);
        dispatch(deleteBlog(blog.id));
    } catch (error) {
        console.error('Failed to remove blog:', error);

    }
};

export const likeBlog = (blog) => async dispatch => {
    const updatedBlog = { ...blog, user: { ...blog.user } };
    updatedBlog.likes++;
    try {
        const response = await blogService.change(updatedBlog);
        dispatch(updateBlogLikes({ id: response.id, likes: response.likes }));
    } catch (error) {
        console.error('Failed to update blog:', error);
    }
};

export default blogsSlice.reducer