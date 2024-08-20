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
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
};

export default LoginForm 