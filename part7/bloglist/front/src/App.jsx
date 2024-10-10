import {useState, useEffect, useRef} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogService';
import loginService from './services/loginService';
import Togglable from './components/Toggleble';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import {useSelector, useDispatch} from 'react-redux';
import {initializeUser, loginUser, removeUser} from './reducers/userReducer';
import {initializeBlogs, createBlog, removeBlog} from './reducers/blogReducer';
import {Table, Form, Button, Alert, Navbar, Nav} from 'react-bootstrap';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const blogs = useSelector(state => state.blogs);
    const [message, setMessage] = useState(null);
    const blogFormRef = useRef();

    useEffect(() => {
        if (user) {
            dispatch(initializeBlogs());
        }
    }, [user, dispatch]);

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    const Notification = ({message}) => {
        if (message === 1) {
            return (
                <Alert variant="success">
                    Blog was created
                </Alert>
            );
        }
        if (message === 2) {
            return (
                <Alert variant="danger">
                    Wrong credentials
                </Alert>
            );
        }
    };

    const handleLogin = async (credentials) => {
        try {
            await dispatch(loginUser(credentials));
        } catch (error) {
            setMessage(2);
            setTimeout(() => {
                setMessage(null);
            }, 3000);
            console.error('Ошибка при входе:', error.message);
        }
    };

    const handleLogout = () => {
        dispatch(removeUser());
    };

    const handleBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility();
        await dispatch(createBlog(newBlog));
        setMessage(1);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const deleteHandler = (blog) => {
        dispatch(removeBlog(blog));
    };

    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                    {user && (
                        <Navbar.Text>
                            Signed in as: {user.name} <Button variant="outline-secondary"
                                                              onClick={handleLogout}>Logout</Button>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Navbar>

            {user === null ? (
                <Togglable buttonLabel='log'>
                    <Notification message={message}/>
                    <LoginForm handleLogin={handleLogin}/>
                </Togglable>
            ) : (
                <>
                    <Notification message={message}/>
                    <Togglable buttonLabel='create blog' ref={blogFormRef}>
                        <BlogForm handleBlog={handleBlog} user={user}/>
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