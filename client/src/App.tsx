import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector, RootStateOrAny } from 'react-redux'
import io from 'socket.io-client'
import './App.css'

import Main from './components/main/Main-idx'
import Error404 from './components/error/404'
import Error500 from './components/error/500'
import Inbx from './components/inb/Inb-idx'
import AuthRoute from './HOCs/AuthRoute'
import UnauthRoute from './HOCs/UnauthRoute'
import UserLink from './components/link/Link-idx'
import TemplateMSG from './components/inb/Template'
import Msg from './components/sendMsg/Msg-idx'
import Loader from './components/partials/Loader'
import { InitContext, ActionEnum } from './global/context/InitContext'
import Menu from './components/partials/Menu'

export default function App() {
	const [isUserNew, setIsUserNew] = useState(false)
	const { isStatus500, isLoaded, user } = useSelector(
		(store: RootStateOrAny) => store.auth
	)
	let {
		state: { socket },
		dispatch,
	} = useContext(InitContext)

	useEffect(() => {
        if(user === null) return;
        if (user.username !== undefined) {
            socket.disconnect();
			dispatch({
				action: ActionEnum.SET_SOCKET,
				payload: {
					socket: io({
						forceNew: true,
						query: { username: user.username },
					}),
				},
			})
		}
	}, [user, dispatch, socket])

	useEffect(() => {
		setTimeout(() => {
			if (!localStorage.getItem('sbm-tq-ft')) {
				setIsUserNew(true)
				localStorage.setItem('sbm-tq-ft', '1')
			}
		}, 1000)
	}, [])

	if (!isStatus500) {
		if (!isLoaded) {
			return <Loader />
		} else {
			return (
				<>
					<Router>
						<Route path="/">
							<Menu isUserNew={isUserNew} />
						</Route>
						<Switch>
							<UnauthRoute
								needsRenderTime={window.navigator.onLine}
								exact
								path="/"
								component={Main}
								redirectTo="/link"
							/>
							<AuthRoute
								path="/messages"
								component={Inbx}
								redirectTo="/"
								needsRenderTime={false}
							/>
							<AuthRoute
								needsRenderTime={true}
								path="/link"
								component={UserLink}
								redirectTo="/"
							/>
							<AuthRoute
								needsRenderTime={false}
								path="/message"
								component={TemplateMSG}
								redirectTo="/"
							/>
							<Route exact path="/:username" component={Msg} />
							<Route path="*">
								<Error404 />
							</Route>
						</Switch>
					</Router>
				</>
			)
		}
	} else return <Error500 />
}
