import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'



const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  // const [newBlog, setNewBlog] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null)


  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message !== null) {
      return (
        <div className='popup--green'>
          Blog was created
        </div>
      )
    }

    if (message === 1) {
      return (
        <div className='popup--green'>
          Contact {message.message} was updated
        </div>
      )
    } else if (message === 2) {
      return (<div className='popup--green'>
        Contact  was created
      </div>)
    } else if (message === 3) {
      return (<div className='popup--green'>
        Contact  was  deleted!
      </div>)

    } else if (message === 4) {
      return (<div className='popup--green'>
        Contact  was  deleted!
      </div>)
    }
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
      console.error('Ошибка при входе:', error.message);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user
    }
    const response = await blogService.create(newBlog)
    setMessage(1)
    setTimeout(() => {
      setMessage(null)
    }, 3000)

    setBlogs(blogs.concat(response))
  }

  const loginForm = () => (
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
  );


  const BlogForm = () => (
    <form onSubmit={handleBlog}>
      <div>
        <h2>Create new blog</h2>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Author"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );

  return (
    <>
      {user === null ?
        loginForm()
        :
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <div>{BlogForm()}</div>
          <h2>blogs</h2>
          <Notification message={message} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      }
    </>
  );
};


export default App