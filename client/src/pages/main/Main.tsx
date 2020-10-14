import React, { lazy } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
const UserLink = lazy(() => import('components/user-link/UserLink'));
const MainLogin = lazy(() => import('components/main-login/MainLogin'));

export default function Main() {
	const { isAuthenticated } = useSelector(
		(store: RootStateOrAny) => store.auth
	);

	return <>{isAuthenticated ? <UserLink /> : <MainLogin />}</>;
}
