import React, { useEffect, useContext, Suspense, lazy, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { InitContext } from 'global/context/InitContext';
import './App.css';
import Loader from 'components/partials/loader/Loader';
import AuthTester from './AuthTester';

const Main = lazy(() => import('components/main/Main-idx'));
const Error404 = lazy(() => import('components/error/404'));
const Error500 = lazy(() => import('components/error/500'));
const Inbx = lazy(() => import('components/inb/Inb-idx'));
const AuthRoute = lazy(() => import('HOCs/AuthRoute'));
const UnauthRoute = lazy(() => import('HOCs/UnauthRoute'));
const UserLink = lazy(() => import('components/link/Link-idx'));
const TemplateMSG = lazy(() => import('components/inb/template/Template'));
const Msg = lazy(() => import('components/sendMsg/Msg-idx'));
const Menu = lazy(() => import('components/partials/menu/Menu'));
const Terms = lazy(() => import('components/terms/Terms'));
const VerifyAccount = lazy(() =>
	import('components/verifyAccount/VerifyAccount')
);

const loader = document.querySelector('#_l');

const hideLoader = () => loader?.classList.add('rem');

export default function App() {
	const { isStatus500, isLoaded, user } = useSelector(
		(store: RootStateOrAny) => store.auth
	);
	let { socket, isTester } = useContext(InitContext).state;
	const testing = process.env.NODE_ENV === 'production';

	useEffect(() => {
		if (user !== undefined)
			socket.emit('tq:init-user', { username: user.username });
	}, [user, socket]);

	if (!isStatus500) {
		if (isLoaded) {
			hideLoader();
			return (
				<>
					{!testing ? (
						<RqqtComp />
					) : !isTester ? (
						<AuthTester />
					) : (
						<RqqtComp />
					)}
				</>
			);
		} else return <div></div>;
	} else return <Error500 />;
}

const RqqtComp = () => {
	const switchContainerRef = useRef(null);

	return (
		<Router>
			<Suspense fallback={<Loader />}>
				<Route path="/">
					<Menu />
				</Route>
				<Route
					render={({ location }) => (
						<TransitionGroup component={null}>
							<CSSTransition
								key={location.key}
								appear={true}
								timeout={{ enter: 250, exit: 0 }}
								classNames="fade"
								nodeRef={switchContainerRef}
							>
								<div styleName='switch-container' ref={switchContainerRef}>
									<Switch location={location}>
										<UnauthRoute
											exact
											path="/"
											component={Main}
											redirectTo="/link"
										/>
										<AuthRoute
											path="/messages"
											component={Inbx}
											redirectTo="/"
										/>
										<AuthRoute
											path="/link"
											component={UserLink}
											redirectTo="/"
										/>
										<AuthRoute
											path="/message"
											component={TemplateMSG}
											redirectTo="/"
										/>
										<Route
											path="/account/verify"
											component={VerifyAccount}
										/>
										<Route
											path="/terms"
											component={Terms}
										/>
										<Route
											exact
											path="/:username"
											component={Msg}
										/>
										<Route path="*">
											<Error404 />
										</Route>
									</Switch>
								</div>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
			</Suspense>
		</Router>
	);
};
