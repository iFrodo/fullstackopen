import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Toggleble';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Info from "./components/Info.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { initializeUser, loginUser, removeUser } from './reducers/userReducer';
import { initializeBlogs, createBlog, removeBlog } from './reducers/blogReducer';
import { showNotification } from "./reducers/notificationReducer.js";
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const blogs = useSelector(state => state.blogs);
    const notification = useSelector(state => state.notification);
    const blogFormRef = useRef();

    useEffect(() => {
        if (user) {
            dispatch(initializeBlogs());
        }
    }, [user, dispatch,blogs]);

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    const Notification = ({ message, type }) => {
        if (!message) return null;

        if (type === 1) {
            return (
                <Alert variant="success">
                    {message}
                </Alert>
            );
        }
        if (type === 2) {
            return (
                <Alert variant="danger">
                    {message}
                </Alert>
            );
        }
        if (type === 3) {
            return (
                <Alert variant="danger">
                    {message}
                </Alert>
            );
        }
    };

    const handleLogin = async (credentials) => {
        try {
            await dispatch(loginUser(credentials));
        } catch (error) {
            dispatch(showNotification('Wrong credentials', 2));
            console.error('Ошибка при входе:', error.message);
        }
    };

    const handleLogout = () => {
        dispatch(removeUser());
    };

    const handleBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility();
        try {
            await dispatch(createBlog(newBlog));
            dispatch(showNotification('Blog was created', 1));
        } catch (error) {
            dispatch(showNotification('Failed to create blog', 2));
            console.error('Ошибка при создании блога:', error.message);
        }
    };

    const deleteHandler = (blog) => {
        dispatch(removeBlog(blog));
        dispatch(showNotification(`${blog.title} was deleted`, 3));
    };

    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user && (
                        <Navbar.Text>
                            Signed in as: {user.name} <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Navbar>

            {user === null ? (
                <Togglable buttonLabel='log'>
                    <Notification message={notification?.message} type={notification?.type} />
                    <LoginForm handleLogin={handleLogin} />
                </Togglable>
            ) : (
                <>
                    <Info/>
                    <Notification message={notification?.message} type={notification?.type} />
                    <Togglable buttonLabel='create blog' ref={blogFormRef}>
                        <BlogForm handleBlog={handleBlog} user={user} />
                    </Togglable>
                    <h2>Blogs</h2>
                    <Table striped bordered hover>
                        <tbody>
                        {sortedBlogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>
                                    <Blog
                                        blog={blog}
                                        deleteHandler={deleteHandler}
                                        deleteBtnText={'delete'}
                                        moreBtnText={'more'}
                                        hideBtnText={'hide'}
                                        likeBtnText={'like!'}
                                        user={user}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};

export default App;