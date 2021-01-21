import React, { useEffect, useState, useContext } from 'react';
import { InitContext } from 'global/context/InitContext';

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
	const [userExists, setUserExists] = useState<boolean | null>(null);

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
				} else if (null !== data && data.expired) {
					setUserExists(false);
				} else {
					setUserExists(true);
				}
			});
		}
	}, [socket, params.username]);

	return (
		<>
			{userExists !== null &&
				(!userExists ? (
					<Error404 />
				) : (
					<Success username={params.username} socket={socket} lang={lang} />
				))}
		</>
	);
}
