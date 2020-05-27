import React, { createContext, useReducer, useEffect } from 'react'
import io from 'socket.io-client';

export const InitContext = createContext();

const initialState = { 
    socket: null, 
    isRendered: false 
}

export const SET_SOCKET = 'SET_SOCKET';
export const SET_IS_RENDERED = 'SET_IS_RENDERED';

function reducer(state, action){
    switch(action.type){
        case SET_SOCKET:
            return {
                ...state,
                socket: action.payload.socket
            };
        case SET_IS_RENDERED:
            return {
                ...state,
                isRendered: action.payload.isRendered
            };
        default:
            return state;
    }
}

export default ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const endpoint = `http://localhost:3000`; //useless nowadays
    
    useEffect(() => {
        try {
          dispatch({
            type: SET_SOCKET,
            payload: { socket: io() }
          });
        } catch (error) {
          console.error(error);
        }
    }, [endpoint]);

    return (
        state.socket !== null
        &&
        <InitContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            { children }
        </InitContext.Provider>
    )
}
