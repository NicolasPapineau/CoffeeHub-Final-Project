import { createContext } from 'react';
import useAuth from './hooks/useAuth'; 

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const { user, login, logout } = useAuth();

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };