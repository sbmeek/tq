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
	const [fields, setFields] = useState({})
	const inputNomTQ = useRef(null)
	const btnTQ = useRef(null)
	const dispatchAuth = useDispatch()
	const {
		state: {
			socket,
			lang: { Main: lang },
		},
		dispatch: dispatchInit,
	} = useContext(InitContext)

	useEffect(() => {
		window.addEventListener('load', () => resizeMainElements(inputNomTQ, btnTQ))
		window.addEventListener('resize', () =>
			resizeMainElements(inputNomTQ, btnTQ)
		)
	}, [])

	useEffect(() => {
		let font = `1rem 'Material Icons'`
		document.fonts.ready.then(function () {
			if (document.fonts.check(font)) {
				inputNomTQ.current.style.fontFamily = `'Nunito', sans-serif`
				setTimeout(() => {
					dispatchInit({
						type: SET_IS_RENDERED,
						payload: { isRendered: true },
					})
				}, 500)
				resizeMainElements(inputNomTQ, btnTQ)
			}
		})
	}, [dispatchInit])

	const handleFormSubmit = (e) => {
		e.preventDefault()
		const { tquser: userVal } = fields
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

	const handleFieldFocus = () => {
		const { current: input } = inputNomTQ
		const { current: btn } = btnTQ
		
		resizeMainElements(inputNomTQ, btnTQ)
	}

	const handleFieldBlur = () => {
		const { current: input } = inputNomTQ
		const { current: btn } = btnTQ
		
		resizeMainElements(inputNomTQ, btnTQ)
	}

	const handleFieldChange = () => {
		const { current: input } = inputNomTQ
		const { current: btn } = btnTQ
		let inputVal = input.value
		inputVal = inputVal.replace(/\s/g, '')
		input.value = inputVal
		setFields({ ...fields, tquser: inputVal })
		resizeMainElements(inputNomTQ, btnTQ)
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
						<div>
							<input
								placeholder={lang['InputPlaceholder']}
								id="usrTQ"
								name="tquser"
								autoComplete="off"
								styleName="inputNomTQ"
								onChange={handleFieldChange}
								onFocus={handleFieldFocus}
								onBlur={handleFieldBlur}
								ref={inputNomTQ}
							/>
							<button
								ref={btnTQ}
								type="submit"
								styleName="btnTQ"
							>
								<i className="material-icons">chevron_right</i>
							</button>
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

function resizeMainElements({ current: input }, { current: btn }) {
	if (null != input && null != btn) {
		btn.style.height = input.getBoundingClientRect().height + 'px'
		let bodyHeight = document.body.getBoundingClientRect().height
		let bodyWidth = document.body.getBoundingClientRect().width
		if (bodyHeight < 627 || bodyWidth < 690) {
			document.body.classList.remove('d-scroll')
		} else {
			document.body.classList.add('d-scroll')
		}
	}
}

export default Main
