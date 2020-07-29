import React, { useEffect, useState, useContext, useRef } from 'react'
import MsgSent from './MsgSent'
import Error404 from '../error/404'
import './Msg.css'
import logo from '../../assets/images/msg/PerfilTQ.png'
import { InitContext } from '../../global/context/InitContext'
import nubes from '../../assets/images/msg/nubes-azul.png'
import nubes2 from '../../assets/images/msg/nubes-azul-2.png'

export default function ({ match: { params } }) {
	const { state } = useContext(InitContext)
	params.username = params.username.toLowerCase()
	const [userExists, setUserExists] = useState(true)

	useEffect(() => {
		if (state.socket !== undefined) {
			state.socket.emit('tq:exists', { username: params.username })
			state.socket.on('tq:exists', (data) => {
				if (data === null) {
					setUserExists(false)
				}
				if (null !== data && data.expired) {
					setUserExists(false)
				}
			})
		}
	}, [state.socket, params.username])

	return (
		<>
			{!userExists ? (
				<Error404 />
			) : (
				<Success username={params.username} socket={state.socket} />
			)}
		</>
	)
}

function Success({ username, socket }) {
	const [msg, setMsg] = useState('')
	const [sent, setSent] = useState(false)
	const btnSubmitMsg = useRef(null)

	useEffect(() => {
		if (socket !== undefined) {
			socket.on('msg:send', (data) => {
				if (data.sent) {
					setSent(true)
					setMsg('')
				}
			})
		}
	}, [socket])

	const handleInputChange = async (e) => {
		const { value } = e.target
		if (3 === value) return 0
		else await setMsg(value)
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()
		const data = { username, msg }
		socket.emit('msg:send', data)
	}

	function shoot() {
		const { current: _btn } = btnSubmitMsg
		let isMsgEmpty = msg === ''
		_btn.style.width = isMsgEmpty ? '35px' : '0px'
		_btn.style.color = isMsgEmpty ? 'white' : 'transparent'
	}

	return (
		<div>
			{sent ? (
				<MsgSent />
			) : (
				<div
					className="valign-wrapper"
					style={{
						minHeight: '100vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						background:
							'linear-gradient(to top, white 80.5%, rgba(246,246,246,0.81) 62%, rgba(237,237,237,1) 497%)',
					}}
				>
					<form onSubmit={handleFormSubmit}>
						<div styleName="contenedor">
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
								}}
							>
								<img src={nubes2} styleName="nube" />

								<img
									className="responsive-image"
									styleName="logoCloud"
									src={logo}
									alt="logo"
									draggable="false"
								/>
								<img
									style={{
										margin: '-34px',
										height: '70px',
										zindex: '1',
										marginLeft: '90px',
										transform: 'scaleX(-1)',
										position: 'absolute',
									}}
									src={nubes}
								/>
							</div>

							<div className="center">
								<div styleName="container2">
									<div styleName="sombra_perfil"></div>
									<h3 className="center" styleName="user">
										{username}
									</h3>
									<h5 className="center" styleName="firstRowText">
										te invitó a que le dejes un
									</h5>
									<h5 className="center" styleName="secondRowText">
										Mensaje anonimo
									</h5>
								</div>
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignitems: 'flex-end',
								marginTop: '-13px',
							}}
						>
							<img
								style={{
									width: '120px',
									height: '70px',
									transform: 'scaleX(-1)',
								}}
								src={nubes2}
							/>
							<img
								style={{
									width: '130px',
									height: '70px',
									marginLeft: '105px',
									marginTop: '-7px',
								}}
								src={nubes}
							/>
						</div>
						<div styleName="Desing">
							<div styleName="Desing">
								<textarea
									styleName="Input-msg"
									type="text"
									name="msg"
									value={msg}
									id="msg"
									placeholder="Escribe tu mensaje"
									onChange={handleInputChange}
									autoComplete="off"
									onInput={shoot}
								/>

								<button type="submit" ref={btnSubmitMsg} styleName="_btn-tq">
									-3
									<i className="material-icons right"></i>
								</button>
							</div>
						</div>
					</form>

					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							margin: '25px',
						}}
					>
						<img
							src={nubes}
							style={{
								width: '120px',
								margin: '-41.5px',
								height: '70px',
								marginleft: '-77px',
								zIndex: '1',
							}}
						/>
						<div styleName="sombra_textarea"></div>
					</div>
				</div>
			)}
		</div>
	)
}
