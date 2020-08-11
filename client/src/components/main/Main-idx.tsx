import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	FormEvent,
	FocusEvent,
	KeyboardEvent,
	ChangeEvent
} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Alert from '../partials/Alert'
import logo from '../../assets/images/ltqrNEW.png'
import './Main-idx.css'
import { getAuthInfoAction } from '../../global/ducks/authDucks'
import { InitContext, ActionEnum } from '../../global/context/InitContext'

const A = new Alert()

type ResType = {
	key: string
	expired: boolean
}

type DataType = {
	_id: string
	key: string
}

function Main() {
	const [username, setUsername] = useState('')
	const [inputMode, setInputMode] = useState(false)
	const [showSubmitBtn, setShowSubmitBtn] = useState(false)
	const tqField = useRef<HTMLTextAreaElement>(null)
	const tqForm = useRef<HTMLFormElement>(null)
	const dispatchAuth = useDispatch()

	const {
		state: {
			socket,
			lang: { Main: lang },
		},
		dispatch: dispatchInit,
	} = useContext(InitContext)

	useEffect(() => {
		let font = `1rem 'Material Icons'`
		;(document as any).fonts.ready.then(function () {
			if ((document as any).fonts.check(font)) {
				tqField.current!.style.fontFamily = `'Nunito', sans-serif`
				setTimeout(() => {
					dispatchInit({
						type: ActionEnum.SET_IS_RENDERED,
						payload: { isRendered: true },
					})
				}, 500)
			}
		})
	}, [dispatchInit])

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const userVal = username
		socket.emit('tq:exists', { username: userVal })
		socket.once('tq:exists', (data: DataType) => {
			if (data == null) {
				socket.emit('tq:register', { tquser: userVal })
				socket.on('save:LS', (data: DataType) => {
					localStorage.setItem(data._id, data.key)
					socket.emit('tq:login', data)
				})
			} else {
				data.key = localStorage.getItem(data._id) as string
				socket.emit('tq:login', data)
			}
			socket.once('tq:login', async (res: ResType) => {
				if (res.expired) {
					A.trigger(`${lang['AlertUserExpired']}.`, {
						btnHTML:
							'<button id="btn-ok" class="btn red darken-4 waves-light waves-effect" onclick="A.ok()">Ok</button>',
					})
					return 0
				}
				const keyVal = res.key != null ? res.key : 'err'
				let settings = {
					headers: { 'Content-Type': 'application/json' },
				}
				const resp = await axios.post(
					`/user/auth?tquser=${userVal}&tqpwd=${keyVal}`,
					settings
				)
				const data = await resp.data
				if (data.authenticated) {
					dispatchAuth(getAuthInfoAction())
				} else {
					A.trigger(`${lang['AlertUserNotAvailable']}.`, {
						btnHTML:
							'<button id="btn-ok" class="btn red darken-4 waves-light waves-effect" onclick="A.ok()">Ok</button>',
					})
				}
			})
		})
	}

	const formatVal = (val: string): string => {
		let l = val.length;
		return (val!.slice(0, l - (l - 20)) as string)
	}

	const handleFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const targetElement = e.target as HTMLTextAreaElement
		const { value: val } = targetElement
		setUsername(formatVal(val.replace(/\s/g, '')))
		setShowSubmitBtn(val.length > 0)
	}

	const handleFieldFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
		setInputMode(!(e.type === 'blur' && username.length === 0))
		if (e.type === 'focus') tqField.current!.focus()
	}

	const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter')
			tqForm.current!.dispatchEvent(new Event('submit', { cancelable: true }))
	}

	return (
		<div styleName="main">
			<form ref={tqForm} styleName="form-container" onSubmit={handleFormSubmit}>
				<img styleName="_tq-logo" src={logo} draggable="false" alt="logo" />
				<div styleName="main-elements-container">
					<div styleName="field-tq">
						<div styleName={`${inputMode ? 'input-mode' : ''}`} tabIndex={-1}>
							<textarea
								value={username}
								id="usrTQ"
								data-name="tquser"
								styleName={`main-input ${inputMode ? 'input-mode' : ''}`}
								data-type={inputMode ? 'text' : 'button'}
								onChange={handleFieldChange}
								onFocus={handleFieldFocus}
								onBlur={handleFieldFocus}
								onKeyPress={handleKeyPress}
								ref={tqField}
								spellCheck="false"
								autoComplete="off"
								maxLength={20}
								placeholder={!inputMode ? lang['InputPlaceholder'] : ""}
							></textarea>
							{showSubmitBtn && (
								<button type="button" styleName="main-btn">
									{'>'}
								</button>
							)}
						</div>
						<div>
							<button type="button" styleName="_btn-tq">
								{lang['BtnInfo']}
								<i className="material-icons">info</i>
							</button>
							<button type="button" styleName="_btn-tq">
								{lang['BtnHelp']}
								<i className="material-icons">help</i>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Main
