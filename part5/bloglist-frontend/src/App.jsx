import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      console.log(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        login,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      setLogin('');
      setPassword('');
    } catch (error) {
      console.error('Ошибка при входе:', error.message);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
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

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};


export default App