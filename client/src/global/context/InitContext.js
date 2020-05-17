import React, { createContext, useState, useEffect } from 'react'
import io from 'socket.io-client';

export const InitContext = createContext();

export default ({ children }) => {
    const [isRendered, setIsRendered] = useState(false);
    const [socket, setSocket] = useState(null);
    const endpoint = `http://localhost:4000`;
    
    useEffect(() => {
        try {
          setSocket(io(endpoint));
        } catch (error) {
          console.error(error);
        }
    }, [endpoint]);

    return (
        socket !== null
        &&
        <InitContext.Provider
            value={{
                socket,
                isRendered,
                setIsRendered
            }}
        >
            { children }
        </InitContext.Provider>
    )
}
