import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector, RootStateOrAny } from 'react-redux'
import './App.css'

import Main from 'components/main/Main-idx'
import Error404 from 'components/error/404'
import Error500 from 'components/error/500'
import Inbx from 'components/inb/Inb-idx'
import AuthRoute from 'HOCs/AuthRoute'
import UnauthRoute from 'HOCs/UnauthRoute'
import UserLink from 'components/link/Link-idx'
import TemplateMSG from 'components/inb/template/Template'
import Msg from 'components/sendMsg/Msg-idx'
import Loader from 'components/partials/loader/Loader'
import { InitContext } from 'global/context/InitContext'
import Menu from 'components/partials/menu/Menu'
import Terms from 'components/terms/Terms'

export default function App() {
	const { isStatus500, isLoaded, user } = useSelector(
		(store: RootStateOrAny) => store.auth
	)
	let {
		state: { socket },
	} = useContext(InitContext)

	useEffect(() => {
		if (user !== undefined)
			socket.emit('tq:init-user', { username: user.username })
	}, [user, socket])

	if (!isStatus500) {
		if (!isLoaded) {
			return <Loader />
		} else {
			return (
				<Router>
					<Route path="/">
						<Menu />
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
						<Route path="/terms" component={Terms} />
						<Route exact path="/:username" component={Msg} />
						<Route path="*">
							<Error404 />
						</Route>
					</Switch>
				</Router>
			)
		}
	} else return <Error500 />
}
