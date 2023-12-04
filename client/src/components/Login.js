import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { login } = useContext(UserContext);

    const loginUser = async (e) => {
        e.persist();
        e.preventDefault();

        setError("");

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
                throw new Error("Failed to login");
            }

            setSuccessMessage("Login successful");

            const userData = await response.json();

            login(userData.user); 

            console.log("User logged in successfully:", userData);

            setTimeout(() => {
                // Redirect to the homepage
                window.location.href = "/";
            }, 1000);
        } catch (loginError) {
            console.error("Login error:", loginError);
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <CardCenter>
        <Card className="login">
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
                <Button type="submit" name="Login" value="Login" />
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <h3>
                Or <Link to="/signup">Register</Link>
            </h3>
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

export default Login;
