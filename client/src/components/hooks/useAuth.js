import { useState, useEffect } from "react";

const useAuth = () => {
    const storedAuth = JSON.parse(localStorage.getItem("auth")) || null;

    const [user, setUser] = useState(storedAuth);
console.log(user)
    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(user));
    }, [user]);

    return { user, login, logout };
};

export default useAuth;
