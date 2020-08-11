import React, { useEffect, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, RootStateOrAny } from 'react-redux'
import Loader from '../components/partials/Loader'
import { InitContext, ActionEnum } from '../global/context/InitContext'
import IPropsHOCs from './IPropsHOCs'

export default function ({ component: Component, needsRenderTime, ...rest }: IPropsHOCs) {

	const {
		auth: { isAuthenticated, isLoaded },
	} = useSelector((store: RootStateOrAny) => store)
	const { state, dispatch } = useContext(InitContext)

	useEffect(() => {
		dispatch({
			type: ActionEnum.SET_IS_RENDERED,
			payload: {
				isRendered: !needsRenderTime,
			},
		})
	}, [dispatch, needsRenderTime])

	useEffect(() => {
		const rootCls = document.querySelector('#react-root')!.classList
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
