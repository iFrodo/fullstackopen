import {  useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Blog, {BlogInfo} from './components/Blog';
import Togglable from './components/Toggleble';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Info from "./components/Info.jsx";
import {UserBlog} from "./components/Info.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { initializeUser, loginUser, removeUser } from './reducers/userReducer';
import { initializeBlogs, createBlog, removeBlog } from './reducers/blogReducer';
import { showNotification } from "./reducers/notificationReducer.js";
import { Table,  Button, Alert, Navbar } from 'react-bootstrap';
import BlogLink from "./components/Blog";


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
    }, [user, dispatch]);

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
            const blogWithUser = {
                ...newBlog,
                user: {
                    login: user.login,
                    name: user.name,
                    id: user.id
                }
            };
            await dispatch(createBlog(blogWithUser));
            dispatch(showNotification('Blog was created', 1));
            dispatch(initializeBlogs());
        } catch (error) {
            dispatch(showNotification('Failed to create blog', 2));
            console.error('Ошибка при создании блога:', error.message);
        }
    };

    const deleteHandler = (blog) => {
        dispatch(removeBlog(blog));
        dispatch(initializeBlogs());
        dispatch(showNotification(`${blog.title} was deleted`, 3));
    };

    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user && (
                        <Navbar.Text>
                            Signed in as: {user.name} <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Navbar>

            <Routes>
                <Route path="/" element={
                    user === null ? (
                        <Togglable buttonLabel='log'>
                            <Notification message={notification?.message} type={notification?.type} />
                            <LoginForm handleLogin={handleLogin} />
                        </Togglable>
                    ) : (
                        <>
                            <Info />
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
                                            <BlogLink
                                                blog={blog}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </>
                    )
                } />
                <Route path="/blogs/:author" element={<UserBlog />} />
                <Route path="/blogs/:id" element={<UserBlog />} />
                <Route path="/blog/:id" element={<BlogInfo blogs={blogs} user={user}  deleteHandler={deleteHandler}/> }/>

            </Routes>
        </Router>
    );
};

export default App;