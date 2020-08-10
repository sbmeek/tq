import React, {
	useEffect,
	useState,
	useContext,
	useRef,
	ChangeEvent,
	FormEvent
} from 'react'
import MsgSent from './MsgSent'
import Error404 from '../error/404'
import './Msg.css'
import logo from '../../assets/images/msg/PerfilTQ.png'
import { InitContext } from '../../global/context/InitContext'
import nubes from '../../assets/images/msg/nubes-azul.png'
import nubes2 from '../../assets/images/msg/nubes-azul-2.png'

type DataType = {
	key?: string
	expired?: boolean
	sent?: boolean
}

export default function ({ match: { params } }: any) {
	const { state } = useContext(InitContext)
	const [userExists, setUserExists] = useState(true)
	params.username = params.username.toLowerCase()

	useEffect(() => {
		if (state.socket !== undefined) {
			state.socket.emit('tq:exists', { username: params.username })
			state.socket.on('tq:exists', (data: DataType) => {
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

function Success({ username, socket }: any) {
	const [msg, setMsg] = useState('')
	const [sent, setSent] = useState(false)
	const btnSubmitMsg = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (socket !== undefined) {
			socket.on('msg:send', (data: DataType) => {
				if (data.sent) {
					setSent(true)
					setMsg('')
				}
			})
		}
	}, [socket])

	const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const targetElement = e.target as HTMLTextAreaElement
		const { value: val } = targetElement
		setMsg(val)
		shoot(val)
	}

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = { username, msg }
		socket.emit('msg:send', data)
	}

	function shoot(val: string) {
		const _btn = btnSubmitMsg.current!
		let isMsgNotEmpty = val.length !== 0
		_btn.style.width = isMsgNotEmpty ? '35px' : '0px'
		_btn.style.color = isMsgNotEmpty ? 'white' : 'transparent'
	}

	return (
		<div>
			{sent ? (
				<MsgSent />
			) : (
				<div className="valign-wrapper" styleName="main">
					<form onSubmit={handleFormSubmit}>
						<div styleName="contenedor">
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
								}}
							>
								<img alt="nubes2" src={nubes2} styleName="nube" />

								<img
									className="responsive-image"
									styleName="logoCloud"
									src={logo}
									alt="logo"
									draggable="false"
								/>
								<img alt="nubes" styleName="nubes2" src={nubes} />
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
								alignItems: 'flex-end',
								marginTop: '-13px',
							}}
						>
							<img
								alt="nubes2"
								style={{
									width: '120px',
									height: '70px',
									transform: 'scaleX(-1)',
								}}
								src={nubes2}
							/>
							<img
								alt="nubes"
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
									data-type="text"
									name="msg"
									value={msg}
									id="msg"
									placeholder="Escribe tu mensaje"
									onChange={handleInputChange}
									autoComplete="off"
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
							alt="nubes"
							src={nubes}
							style={{
								width: '120px',
								margin: '-41.5px',
								height: '70px',
								marginLeft: '-77px',
								zIndex: 1,
							}}
						/>
						<div styleName="sombra_textarea"></div>
					</div>
				</div>
			)}
		</div>
	)
}
