import React, {
	useEffect,
	useState,
	useContext,
	ChangeEvent,
	FormEvent,
} from 'react'
import MsgSent from './MsgSent'
import Error404 from '../error/404'
import './Msg-idx.css'
import logo from 'assets/images/msg/profile-tq.png'
import { InitContext } from 'global/context/InitContext'
import cloud1 from 'assets/images/msg/cloud.png'
import cloud2 from 'assets/images/msg/cloud-2.png'
import arrow from 'assets/images/icons/icons-main/icon-arrow.svg'

type DataType = {
	key?: string
	expired?: boolean
	sent?: boolean
}

export default function <
	T extends { match: { params: P } },
	P extends { username: string }
>({ match: { params } }: T) {
	const {
		socket,
		lang: { MsgIdx: lang },
	} = useContext(InitContext).state
	const [userExists, setUserExists] = useState(true)
	params.username = params.username.toLowerCase()

	useEffect(() => {
		if (socket !== undefined) {
			socket.emit('tq:exists', { username: params.username })
			socket.on('tq:exists', (data: DataType) => {
				if (data === null) {
					setUserExists(false)
				}
				if (null !== data && data.expired) {
					setUserExists(false)
				}
			})
		}
	}, [socket, params.username])

	return (
		<>
			{!userExists ? (
				<Error404 />
			) : (
				<Success username={params.username} socket={socket} lang={lang} />
			)}
		</>
	)
}

function Success<
	T extends {
		username: string
		socket: SocketIOClientStatic['Socket']
		lang: { [key: string]: string }
	}
>({ username, socket, lang }: T) {
	const [msg, setMsg] = useState('')
    const [sent, setSent] = useState(false)
    const [showSubmitBtn, setShowSubmitBtn] = useState(false)

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
		let isMsgNotEmpty = val.length !== 0
        setShowSubmitBtn(isMsgNotEmpty)
	}

	return (
		<div styleName="container">
			{sent ? (
				<MsgSent />
			) : (
				<form onSubmit={handleFormSubmit} styleName="curtain">
					<div styleName="contenedolsito">
						<div styleName="cloud-top-container">
							<img src={cloud2} alt="cloud2-top" styleName="cloud2-top"></img>
							<img src={cloud1} alt="cloud-top" styleName="cloud1-top"></img>
						</div>
						<div styleName="layer">
							<div styleName="en-layer">
								<div styleName="logo-div">
									<img src={logo} alt="logo" styleName="logo" />
								</div>
								<div styleName="shadow_logo"></div>
								<h3 styleName="user">{username}</h3>
								<h5 styleName="firstRowText">{lang['FirstRowText']}</h5>
								<h5 styleName="secondRowText">{lang['SecondRowText']}</h5>
								<div styleName="box">
									<div styleName="cloud-bottom1-container">
										<img
											src={cloud2}
											alt="cloud2-bottom"
											styleName="cloud2-bottom"
										></img>
										<img
											src={cloud1}
											alt="cloud-bottom"
											styleName="cloud1-bottom"
										></img>
									</div>
									<div styleName="input-container">
										<textarea
											styleName="input-msg"
											data-type="text"
											name="msg"
											value={msg}
											id="msg"
											placeholder={lang["FieldPlaceholder"]}
											onChange={handleInputChange}
                                            autoComplete="off"
                                            autoFocus
                                            spellCheck={false}
										/>
										<button
											type="submit"
											styleName={`_btn-tq ${showSubmitBtn ? 'active' : ''}`}
										>
											<img src={arrow} alt="arrow icon"/>
										</button>
									</div>
									<div styleName="cloud-bottom2-container">
										<img
											src={cloud1}
											alt="cloud1-bottom2"
											styleName="cloud1-bottom2"
										></img>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	)
}
