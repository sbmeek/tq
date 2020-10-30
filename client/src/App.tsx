import React, { useEffect, useContext, lazy } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { InitContext } from 'global/context/InitContext';
import AuthInPrivateMode from 'pages/authInPrivateMode/AuthInPrivateMode';
import Routes from './Routes';

const Error500 = lazy(() => import('components/error/500'));

const loader = document.querySelector('#_l');

const hideLoader = () => loader?.classList.add('rem');

export default function App() {
	const { isStatus500, isLoaded, user } = useSelector(
		(store: RootStateOrAny) => store.auth
	);
	let { socket, isTester } = useContext(InitContext).state;
	const PRIVATE_MODE = process.env.NODE_ENV === 'production';

	useEffect(() => {
		if (user !== undefined)
			socket.emit('tq:init-user', { username: user.username });
	}, [user, socket]);

	if (!isStatus500) {
		if (isLoaded) {
			hideLoader();
			return (
				<>
					{!PRIVATE_MODE ? (
						<Routes />
					) : !isTester ? (
						<AuthInPrivateMode />
					) : (
						<Routes />
					)}
				</>
			);
		} else return <div></div>;
	} else return <Error500 />;
}
