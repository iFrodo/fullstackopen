import { PropTypes } from "prop-types";
import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired
    }

    const handleSubmit = (e) => {
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

            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Log in to application</h2>
                    login
                    <input
                        type="text"
                        value={login}
                        name="Login"
                        placeholder="login"
                        data-testid='loginInput'
                        onChange={({ target }) => setLogin(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                           placeholder="password"
                           data-testid='passwordInput'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button data-testid='loginBtn'type="submit">login</button>
            </form>
        </>
    )
};

export default LoginForm 