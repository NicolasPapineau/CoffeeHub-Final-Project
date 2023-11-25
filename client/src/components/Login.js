import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        setError(''); 

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            setSuccessMessage('Login successful');

            const userData = await response.json();
            console.log('User logged in successfully:', userData);

        } catch (loginError) {
            console.error('Login error:', loginError);
            setError('Invalid username or password. Please try again.');
        }
    };


    return (

        <div className="login">

            <h1>Login</h1>

            <form onSubmit={loginUser}>
                <input
                    name="username"
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    name="password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input type="submit" name="Login" value="Login" />
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}


            <h3>Or <Link to="/signup">Register</Link></h3>


        </div>
    )
};

export default Login;