import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

export default function({component: Component, ...rest }) {
    const { isAuthenticated } = useContext(AuthContext);
    
    return (
        <Route 
            {...rest}
            render={(props) => 
            (
                !isAuthenticated ? 
                <Redirect
                    to={{ 
                        pathname: rest.redirectTo, 
                        state: { from: props.location } 
                    }}
                /> :
                <Component />
            )
        }
        />
    )
}
