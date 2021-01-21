import Loader from 'components/loader/Loader';
import React, { lazy, Suspense } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const Root = lazy(() => import('components/root/Root'));
const UserLink = lazy(() => import('components/user-link/UserLink'));

export default function Main() {
	const { isAuthenticated } = useSelector(
		(store: RootStateOrAny) => store.auth
	);

	return (
		<>
			{isAuthenticated ? (
				<Suspense fallback={<Loader />}>
					<UserLink />
				</Suspense>
			) : (
				<Root />
			)}
		</>
	);
}
