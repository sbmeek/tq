import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../api';
import { useRef } from 'react';

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isStatus500, setIsStatus500] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const wait = useRef(null);

    const dots = () => {
        window.setInterval(function() {
            if(wait.current !== null){
                let {current} = wait;
                if (current.innerHTML.length >= 3) 
                    current.innerHTML = "";
                else 
                    current.innerHTML += ".";
            }
        }, 100);
      }
    
      useEffect(() => {
        dots()
      }, [wait]);

    useEffect(() => {
        const setStuff = async () => {
            let res = await auth();
            if(res){
                setTimeout(() => {
                    setIsAuthenticated(res.authenticated);
                    setUser(res.user);
                    setIsStatus500(res.isStatus500);
                    setIsLoaded(true);
                }, 1500)
            }
        }
        setStuff();
    }, [isAuthenticated, isStatus500]);

    return (
        !isLoaded ?
        <div 
        style={{
            fontSize: '150px',
            opacity: '1',
            position: 'fixed',
            backgroundColor: '#FFF',
            zIndex: "24",
            width: '100%',
            minWidth: '110vh',
            minHeight: '110vh'
        }}
        className="valign-wrapper"
        >
            <div 
                className="center-align"
                style={{width: '100%'}}
            >
                <h1 style={{color: '#000'}}>Cargando<span ref={wait}>...</span></h1>
            </div>
        </div>
        :<AuthContext.Provider
            value={{
                user, 
                setUser, 
                isAuthenticated, 
                setIsAuthenticated,
                isStatus500,
                isRendered,
                setIsRendered
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
