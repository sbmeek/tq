import React, { useEffect, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/partials/Loader'

// Context
import { InitContext, SET_IS_RENDERED } from '../global/context/InitContext'

export default function ({ component: Component, needsRenderTime, ...rest }) {
	const {
		auth: { isAuthenticated, isLoaded },
	} = useSelector((store) => store)
	const { state, dispatch } = useContext(InitContext)

	useEffect(() => {
		dispatch({
			type: SET_IS_RENDERED,
			payload: {
				isRendered: !needsRenderTime,
			},
		})
	}, [dispatch, needsRenderTime])

	useEffect(() => {
		const rootCls = document.querySelector('#react-root').classList
		!state.isRendered ? rootCls.add('d-scroll') : rootCls.remove('d-scroll')
	}, [state.isRendered])

	return (
		<>
			{!isLoaded ? <Loader /> : !state.isRendered && <Loader />}
			<Route
				{...rest}
				render={(props) =>
					isAuthenticated ? (
						<Redirect
							to={{
								pathname: rest.redirectTo,
								state: { from: props.location },
							}}
						/>
					) : (
						<Component />
					)
				}
			/>
		</>
	)
}
