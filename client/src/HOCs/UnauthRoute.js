import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loader from '../components/partial/Loader';

export default function({component: Component, ...rest }) {
    const { auth: { isAuthenticated, isLoaded } } = useSelector(store => store);

    return (
        !isLoaded
        ?
        <Loader />
        :
        <Route 
            {...rest} 
            render={(props) => 
            (
                isAuthenticated ? 
                <Redirect 
                    to={{
                        pathname: rest.redirectTo, 
                        state: { from: props.location } 
                    }} 
                /> :
                <Component socket={rest.socket} />
            )
        }
        />
    )
}
