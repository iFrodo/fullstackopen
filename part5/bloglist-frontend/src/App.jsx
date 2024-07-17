import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Togglable from './components/Toggleble'
import BlogForm from './components/BlogForm'



const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  // const [newBlog, setNewBlog] = useState('');


  const [message, setMessage] = useState(null)

  const blogFormRef = useRef();
  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  // useEffect(() => {
  //   if (blogs) {
  //     blogService.getAll().then((blogs) => setBlogs(blogs)) === blogs ? '':blogService.getAll().then((blogs) => setBlogs(blogs));
  //   }
  // }, [blogs]);



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === 1) {
      return (
        <div className='popup--green'>
          Blog was created
        </div>
      )
    }
    if (message === 2) {
      return (
        <div className='popup--red'>
          wrond credentials
        </div>
      )
    }

    // if (message === 1) {
    //   return (
    //     <div className='popup--green'>
    //       Contact {message.message} was updated
    //     </div>
    //   )
    // } else if (message === 2) {
    //   return (<div className='popup--green'>
    //     Contact  was created
    //   </div>)
    // } else if (message === 3) {
    //   return (<div className='popup--green'>
    //     Contact  was  deleted!
    //   </div>)

    // } else if (message === 4) {
    //   return (<div className='popup--green'>
    //     Contact  was  deleted!
    //   </div>)
    // }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        login,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user);
      setLogin('');
      setPassword('');
    } catch (error) {
      setMessage(2)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      console.error('Ошибка при входе:', error.message);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleBlog = async (newBlog) => {
    //закрывать форму после отправки
    blogFormRef.current.toggleVisibility()

    const response = await blogService.create(newBlog)
    // notification
    setMessage(1)
    setTimeout(() => {
      setMessage(null)
    }, 3000)

    setBlogs(blogs.concat(response))
  }
  const deleteHandler = (blog) => {
    const response = blogService.remove(blog.id).then(() => {
      setBlogs(blogs.filter(el => el.id !== blog.id));
    });
  }

  const LoginForm = () => (
    <>

      <form onSubmit={handleLogin}>
        <div>
          <h2>Log in to application</h2>
          login
          <input
            type="text"
            value={login}
            name="Login"
            onChange={({ target }) => setLogin(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );



  return (
    <>
      {user === null ?

        <Togglable buttonLabel='log'>

          <div>{LoginForm()}</div>
        </Togglable>
        :
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Notification message={message} />
          <Togglable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm handleBlog={handleBlog} user={user} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} deleteHandler={deleteHandler} deleteBtnText={'delete'}
            moreBtnText={'more'} hideBtnText={'hide'}  />
          ))}
        </>
      }
    </>
  );
};


export default App