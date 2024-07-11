const LoginForm = ({ handleLogin, login, handleLoginChange, password, handlePasswordChange }) => (

    <form onSubmit={handleLogin}>
        <div>
            login
            <input
                type="text"
                value={login}
                name="login"
                onChange={handleLoginChange}
            />
        </div>
        <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">login</button>
    </form>
)
export default LoginForm