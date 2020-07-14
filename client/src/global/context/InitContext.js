import React, { createContext, useReducer, useEffect } from 'react'
import io from 'socket.io-client';

import en from '../../lang/en';
import es from '../../lang/es';

export const InitContext = createContext();

const initialState = { 
    socket: null, 
    isRendered: false,
    lang: en
}

export const SET_SOCKET = 'SET_SOCKET';
export const SET_IS_RENDERED = 'SET_IS_RENDERED';
export const SET_LANG = 'SET_LANG';

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
        case SET_LANG:
            return {
                ...state,
                lang: action.payload.lang
            }
        default:
            return state;
    }
}

export default ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const endpoint = `http://localhost:3000`;
    
    useEffect(() => {
        try {
          dispatch({
            type: SET_SOCKET,
            payload: { socket: io() }
          });
        } catch (error) {
          console.error(error);
        }
    }, []);

    useEffect(() => {
        dispatch({
            type: SET_LANG,
            payload: { lang: gsetLang() }
        })
    }, []);

    const gsetLang = () => {
        switch(navigator.language.substring(0, 2)){
            case 'es': return es;
            default: return en;
        }
    }

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
