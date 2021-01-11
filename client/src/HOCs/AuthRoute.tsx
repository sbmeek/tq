import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import IPropsHOCs from './IPropsHOCs';

export default function ({ component: Component, ...rest }: IPropsHOCs) {
	const { isAuthenticated } = useSelector(
		(store: RootStateOrAny) => store.auth
	);

	return (
		<>
			<Route
				{...rest}
				render={(props) =>
					!isAuthenticated ? (
						<Redirect
							to={{
								pathname: rest.redirectTo,
								state: { from: props.location }
							}}
						/>
					) : (
						<Component />
					)
				}
			/>
		</>
	);
}
