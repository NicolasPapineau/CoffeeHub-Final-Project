import React, { useState } from 'react';
import styled from "styled-components";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();

        setError('');

        if (password !== verifyPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            const response = await fetch("/api/checkUsername", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Failed to check username');
            }

            const data = await response.json();

            if (data.exists) {
                setError('Username already exists. Please choose a different one.');
                return;
            }
        } catch (error) {
            console.error('Username check error:', error);
            setError('Error checking username. Please try again.');
            return;
        }

        try {
            const response = await fetch("/api/signup", {
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
                throw new Error('Failed to register user');
            }

            setSuccessMessage('Registration successful');


            const registrationData = await response.json();
            console.log('User registered successfully:', registrationData);

            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);

        } catch (registrationError) {
            console.error('Registration error:', registrationError);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <CardCenter>
        <Card className="register">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min. 8 characters)"
                    required
                />
                <input
                    value={verifyPassword}
                    type="password"
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    placeholder="Verify Password"
                    required
                />
                <Button type="submit" value="Register" />
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </Card>
        </CardCenter>
    );
};

const CardCenter = styled.div`
display: flex;
justify-content: center;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 240, 0.9);
    width: 60vw;
    margin-right: 30px;
    margin-top: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    h2 {
        font-size: 2em;
    }
    p {
        font-size: 1.25em;
    }
    label {
        font-size: 1.25em;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }
    input {
        margin: 10px;
        font-size: 1.25em;
        
    }
`;

const Button = styled.input`
    background-color: burlywood;
    color: white;
    padding: 5px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
        opacity: 0.5;
    }
    &:enabled {
        opacity: 1.0;
    }
    &:hover {
        background-color: brown
    }
    &:active {
    /* background-color: #3e8e41; */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    
    }
`

export default Signup;
