import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    return (
        
        <div className="login">

            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" />

            </form>

            
            <h3>Or <Link to="/signup">Register</Link></h3>
            

        </div>
    )
};

export default Login;