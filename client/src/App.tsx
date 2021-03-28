import React, { useEffect, useContext, Suspense, lazy } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { InitContext } from 'global/context/InitContext';
import AuthInPrivateMode from 'pages/authInPrivateMode/AuthInPrivateMode';
import Routes from './Routes';
import { setUserMessagesAction } from 'global/ducks/authDucks';

const Error500 = lazy(() => import('components/error/500'));

export default function App() {
	const dispatch = useDispatch();
	const { isStatus500, isLoaded, user } = useSelector(
		(store: RootStateOrAny) => store.auth
	);
	let { socket, isTester } = useContext(InitContext).state;
	const PRIVATE_MODE = process.env.REACT_APP_ENV === 'production';

	useEffect(() => {
		if (user !== undefined)
			socket.emit('tq:init-user', { username: user.username });
	}, [user, socket]);

	useEffect(() => {
		socket.on('msg:new', (data: ITQMessage[]) => {
			dispatch(setUserMessagesAction(data));
		});
	}, [socket, dispatch]);

	if (!isStatus500) {
		if (isLoaded) {
			return (
				<>
					<Suspense fallback={null}>
						{!PRIVATE_MODE ? (
							<Routes />
						) : !isTester ? (
							<AuthInPrivateMode />
						) : (
							<Routes />
						)}
					</Suspense>
				</>
			);
		} else return <div></div>;
	} else return <Error500 />;
}
