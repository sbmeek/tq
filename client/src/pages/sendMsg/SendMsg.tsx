import React, { useEffect, useState, useContext } from 'react';
import { InitContext } from 'global/context/InitContext';
import Loader from 'components/loader/Loader';

const Success = React.lazy(() => import('./success/Success'));
const Error404 = React.lazy(() => import('../error404/Error404'));

export type DataType = {
	key?: string;
	expired?: boolean;
	sent?: boolean;
};

export default function <
	T extends { match: { params: P } },
	P extends { username: string }
>({ match: { params } }: T) {
	const [isLoading, setIsLoading] = useState(true);
	const [userExists, setUserExists] = useState(true);

	const {
		socket,
		lang: { MsgIdx: lang }
	} = useContext(InitContext).state;

	params.username = params.username.toLowerCase();

	useEffect(() => {
		if (socket !== undefined) {
			socket.emit('tq:exists', { username: params.username });
			socket.once('tq:exists', (data: DataType) => {
				if (data === null) {
					setUserExists(false);
				}
				if (null !== data && data.expired) {
					setUserExists(false);
				}
				setIsLoading(false);
			});
		}
	}, [socket, params.username]);

	return (
		<>
			{isLoading && <Loader />}
			{!userExists ? (
				<Error404 />
			) : (
				<Success username={params.username} socket={socket} lang={lang} />
			)}
		</>
	);
}
