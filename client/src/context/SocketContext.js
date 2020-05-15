import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = React.createContext();

export default ({ children }) => {
    const endpoint = `http://localhost:4000`
    const [socket, setSocket] = useState(null);
    const [isSocketLoaded, setIsSocketLoaded ] = useState(false);

    useEffect(() => {
      try {
        setSocket(io(endpoint));
        setIsSocketLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }, [endpoint, setIsSocketLoaded]);

    return (
        isSocketLoaded ? 
        <SocketContext.Provider value={{
            socket
        }}>
            { children }
        </SocketContext.Provider> :
        '' 
    )
}