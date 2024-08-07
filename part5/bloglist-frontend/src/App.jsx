import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Togglable from './components/Toggleble'
import BlogForm from './components/BlogForm'
import { LoginForm } from './components/LoginForm'



const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);


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

  const handleLogin = async (credentials) => {
    try {
      const response = await loginService.login(credentials)
      blogService.setToken(response.token);
      window.localStorage.setItem('user', JSON.stringify(response))
      setUser(response);

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


  // Сначала скопируй массив блогов, чтобы не изменять оригинальный массив
  const sortedBlogs = [...blogs];

  // Теперь отсортируй блоги по убыванию количества лайков
  sortedBlogs.sort((a, b) => b.likes - a.likes);
  return (
    <>
      {user === null ?
        <Togglable buttonLabel='log'>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
        :
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Notification message={message} />
          <Togglable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm handleBlog={handleBlog} user={user} />
          </Togglable>
          <h2>blogs</h2>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} deleteHandler={deleteHandler} deleteBtnText={'delete'}
              moreBtnText={'more'} hideBtnText={'hide'} likeBtnText={'like!'} user={user} />
          ))}
        </>
      }
    </>
  );
};


export default App