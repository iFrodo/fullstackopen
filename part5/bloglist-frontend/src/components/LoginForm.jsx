import loginService from "../services/loginService";
import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const loginFormSend = (e) => {
        e.preventDefault()
        handleLogin({
            login,
            password,
        });
        setLogin('');
        setPassword('');
    }
    return (
        <>

            <form onSubmit={loginFormSend}>
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
    )
};

export { LoginForm }