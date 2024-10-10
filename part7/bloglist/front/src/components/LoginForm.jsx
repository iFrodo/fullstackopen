import { PropTypes } from "prop-types";
import { useState } from "react";
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ handleLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    LoginForm.propTypes = {
        handleLogin: PropTypes.func.isRequired,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({
            login,
            password,
        });
        setLogin('');
        setPassword('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Log in to application</h2>
            <Form.Group controlId="formBasicLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control
                    type="text"
                    value={login}
                    name="Login"
                    placeholder="Enter login"
                    data-testid='loginInput'
                    onChange={({ target }) => setLogin(target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    name="Password"
                    placeholder="Password"
                    data-testid='passwordInput'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" data-testid='loginBtn'>
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;