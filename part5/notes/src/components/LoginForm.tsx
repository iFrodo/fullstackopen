import Notification from "./Notification"

const LoginForm = ({ handleLogin, login, handleLoginChange, password, handlePasswordChange,notification }:any) => (
<>
<Notification message={notification}/>
<form onSubmit={handleLogin}>
        <div>
            login
            <input
                type="text"
                value={login}
                name="login"
                placeholder="login"
                data-testid='login'
                onChange={handleLoginChange}
            />
        </div>
        <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                placeholder="password"
                data-testid='password'
                onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">login</button>
    </form>

</>
   
)
export default LoginForm