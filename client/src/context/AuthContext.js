import React, { createContext, useState, useEffect } from 'react'
import authService from '../services/AuthService';

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [isStatus500, setIsStatus500] = useState(false);

    useEffect(() => {
        const setStuff = async () => {
            let res = await authService();
            if(res){
                setIsAuthenticated(res.authenticated);
                setUser(res.user);
                setIsStatus500(res.isStatus500);
                // setIsLoaded(true);
            }
        }
        setStuff();
    }, [isAuthenticated, isStatus500]);

    return (
        <AuthContext.Provider
            value={{
                user, 
                setUser, 
                isAuthenticated, 
                setIsAuthenticated,
                isStatus500
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
