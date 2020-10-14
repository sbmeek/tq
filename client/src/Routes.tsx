import React, { Suspense, lazy, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loader from 'components/loader/Loader';

const AuthRoute = lazy(() => import('HOCs/AuthRoute'));
const UnauthRoute = lazy(() => import('HOCs/UnauthRoute'));
const Menu = lazy(() => import('components/menu/Menu'));
const TemplateMSG = lazy(() => import('pages/msgTemplate/MsgTemplate'));
const Main = lazy(() => import('pages/main/Main-idx'));
const Inbx = lazy(() => import('pages/inbox/Inbox'));
const Error404 = lazy(() => import('pages/error404/Error404'));
const UserLink = lazy(() => import('pages/link/Link-idx'));
const Msg = lazy(() => import('pages/sendMsg/SendMsg'));
const Terms = lazy(() => import('pages/terms/Terms'));
const VerifyAccount = lazy(() =>
	import('components/verifyAccount/VerifyAccount')
);

export default function Routes() {
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
								<div style={{ height: '100%' }} ref={switchContainerRef}>
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
										<Route path="/account/verify" component={VerifyAccount} />
										<Route path="/terms" component={Terms} />
										<Route exact path="/:username" component={Msg} />
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
}
