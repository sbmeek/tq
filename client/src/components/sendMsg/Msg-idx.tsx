import React, {
	useEffect,
	useState,
	useContext,
	useRef,
	ChangeEvent,
	FormEvent,
} from 'react'
import MsgSent from './MsgSent'
import Error404 from '../error/404'
import './Msg.css'
import logo from '../../assets/images/msg/PerfilTQ.png'
import { InitContext } from '../../global/context/InitContext'
import nubes1 from '../../assets/images/msg/nubes-azul.png'
import nubes2 from '../../assets/images/msg/nubes-azul-2.png'

type DataType = {
	key?: string
	expired?: boolean
	sent?: boolean
}

export default function <
	T extends { match: { params: P } },
	P extends { username: string }
>({ match: { params } }: T) {
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
			<div>
				{sent ? (
					<MsgSent />
				) : (
					<form onSubmit={handleFormSubmit} styleName="curtain">
						<div styleName="contenedolsito">
							<div styleName="nubes-top">
								<img src={nubes1} alt="nubes2-top" styleName="nubes2-top"></img>
								<img src={nubes2} alt="nubes-top" styleName="nubes1-top"></img>
							</div>
							<div styleName="capa">
								<div styleName="en-capa">
									<div styleName="logo-div">
										<img src={logo} alt="logo" styleName="logo" />
									</div>
									<div styleName="sombra_perfil"></div>
									<h3 styleName="user">{username}</h3>
									<h5 styleName="firstRowText">te invitó a que le dejes un</h5>
									<h5 styleName="secondRowText">Mensaje anonimo</h5>
									<div styleName="box">
										<div styleName="nubes-bottom">
											<img
												src={nubes2}
												alt="nubes2-bottom"
												styleName="nubes2-bottom"
											></img>
											<img
												src={nubes1}
												alt="nubes-bottom"
												styleName="nubes1-bottom"
											></img>
										</div>
										<div styleName="prueba">
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

											<button
												type="submit"
												ref={btnSubmitMsg}
												styleName="_btn-tq"
											>
												-3
												<i className="material-icons right"></i>
											</button>
										</div>
										<div styleName="nubes-bottom2">
											<img
												src={nubes1}
												alt="nubes1-bottom2"
												styleName="nubes1-bottom2"
											></img>
											<div styleName="sombra_textarea"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	)
}
