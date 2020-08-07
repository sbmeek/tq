import React, { useState, useEffect, useRef, useContext } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Alert from '../partials/Alert'
import logo from '../../assets/images/ltqrNEW.png'
import './Main-idx.css'

import { getAuthInfoAction } from '../../global/ducks/authDucks'
import { InitContext, SET_IS_RENDERED } from '../../global/context/InitContext'

const A = new Alert()

function Main() {
	const [username, setUsername] = useState("")
	const [inputMode, setInputMode] = useState(false)
	const [showSubmitBtn, setShowSubmitBtn] = useState(false)
	const tqField = useRef(null)
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
		document.fonts.ready.then(function() {
			if (document.fonts.check(font)) {
				tqField.current.style.fontFamily = `'Nunito', sans-serif`
				setTimeout(() => {
					dispatchInit({
						type: SET_IS_RENDERED,
						payload: { isRendered: true },
					})
				}, 500)
			}
		})
	}, [dispatchInit])

	const handleFormSubmit = (e) => {
		e.preventDefault()
		const userVal = username
		socket.emit('tq:exists', { username: userVal })
		socket.once('tq:exists', (data) => {
			if (data == null) {
				socket.emit('tq:register', { tquser: userVal })
				socket.on('save:LS', (data) => {
					localStorage.setItem(data._id, data.key)
					socket.emit('tq:login', data)
				})
			} else {
				data.key = localStorage.getItem(data._id)
				socket.emit('tq:login', data)
			}
			socket.once('tq:login', async (res) => {
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

	const handleFieldChange = (e) => {
		const { value: val } = e.target;
		setUsername(val.replace(/\s/g, ''));
		setShowSubmitBtn(val.length > 0);
	}

	const handleFieldFocus = (e) => {
		setInputMode(!(e.type === "blur" && username.length === 0))
		if(e.type === "focus") tqField.current.focus();
	}

	return (
		<div styleName="main">
			<form styleName="form-container" onSubmit={handleFormSubmit}>
				<img
					styleName="_tq-logo"
					src={logo}
					draggable="false"
					alt="logo"
				/>
				<div styleName="main-elements-container">
					<div styleName="field-tq">
						<div styleName={`${inputMode ? "input-mode" : ""}`} tabIndex="-1">
					
							<textarea
								value={!inputMode ? lang['InputPlaceholder'] : username}
								id="usrTQ"
								name="tquser"
								autoComplete="off"
								styleName={`main-input ${inputMode ? "input-mode" : ""}`}
								style={{ 
									maxWidth: `${showSubmitBtn ? "90%" : "100%"}`,
									textAlign: `${inputMode ? "left" : "center"}`,
									padding: `${inputMode ? "4px 10px" : "7px"}`
								}}
								type={inputMode ? "text" : "button"}
								onChange={handleFieldChange}
								onFocus={handleFieldFocus}
								onBlur={handleFieldFocus}
								ref={tqField}
								spellCheck="false"
							/>
							{
								showSubmitBtn 
								&& 
								
								<button
									type="button"
									styleName="main-btn"
								>
									{">"}
								</button>
								
							}
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
