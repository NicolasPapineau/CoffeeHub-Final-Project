import React, { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();

        setError(''); // Clear previous errors

        if (password !== verifyPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        // Check if the username already exists
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

        // If username is available, proceed with registration
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
            // Handle successful registration, e.g., redirect to login page or show a success message
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
        <div className="register">
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
                <input type="submit" value="Register" />
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default Signup;
