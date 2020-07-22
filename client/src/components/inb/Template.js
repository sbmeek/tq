import React, { useState, useContext, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { InitContext } from '../../global/context/InitContext'
import './Template.css'

import BgColors from './TemplateOpts/BgColors'
import Labels from './TemplateOpts/Labels'

export default function Template() {
	const [answer, setAnswer] = useState('')
	const [actualMsg, setActualMsg] = useState({})
	const InitialStateOptsVisibility = {
		bgColorsOptShown: false,
		labelsOptShown: false,
	}
	const [optsVisibility, setOptsVisibility] = useState(
		InitialStateOptsVisibility
	)
	const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true)
	const { socket } = useContext(InitContext)
	const templateQuestion = useRef(null)
	const templateAnswer = useRef(null)
	const ansInput = useRef(null)
	const optsSwipe = useRef(null)
	const location = useLocation()

	useEffect(() => {
		const {
			state: { actualMsg: msg },
		} = location
		setActualMsg(msg)
		templateAnswer.current.focus()
		templateQuestion.current.innerHTML = `"${actualMsg.content}"`
	}, [location, actualMsg])

	const handleFormSubmit = (e) => {
		e.preventDefault()
		let data = { answer }
		data._id = actualMsg._id
		socket.emit('msg:ans', data)
		socket.on('msg:ans', (data) => {
			if (data.success) {
				//success
			}
		})
	}

	const handleInput = async (e) => {
		const { textContent: ansVal } = e.currentTarget
		setIsPlaceholderVisible(ansVal.length < 1)
		await setAnswer(e.currentTarget.innerHTML)
		console.log(answer)
	}

	const handleBtnFormatClick = (e) => {
		const {
			target: { parentElement: target },
		} = e
		formatAnswer(target.title.toLowerCase())
	}

	const formatAnswer = (cmd) => {
		document.execCommand(cmd, false, null)
		setAnswer(ansInput.current.innerHTML)
		ansInput.current.focus()
	}

	const toggleOptSwipe = (e) => {
		const { target: trgt } = e
		const { current: optSwp } = optsSwipe
		let _dsrdOpt = getDesiredOpt(trgt.id)
		let desiredOpt = Object.keys(_dsrdOpt)[0]
		let _optsVisibility = {
			...InitialStateOptsVisibility,
			[Object.keys(_dsrdOpt)[0]]: true,
		}

		if (optSwp.classList.contains('opts-swipe_actv')) {
			if (optsVisibility[desiredOpt]) {
				optSwp.classList.remove('opts-swipe_actv')
				_optsVisibility = InitialStateOptsVisibility
			} else
				_optsVisibility = {
					...InitialStateOptsVisibility,
					[Object.keys(_dsrdOpt)[0]]: true,
				}
		} else optSwp.classList.toggle('opts-swipe_actv')

		setOptsVisibility(_optsVisibility)
	}

	const getDesiredOpt = (_id) => {
		switch (_id) {
			case 'bg-colors':
				return { bgColorsOptShown: true }
			case 'labels':
				return { labelsOptShown: true }
			default:
				return {}
		}
	}

	useEffect(() => {
		console.log(optsVisibility)
	}, [optsVisibility])

	return (
		<div styleName="template-container" id="tmpt-cont">
			<div>
				<div styleName="template-head-btns">
					<Link to="/messages" styleName="template-btn-back">
						<i className="material-icons">keyboard_backspace</i>
					</Link>
					<button styleName="template-btn-share" onClick={() => alert('share')}>
						<i className="material-icons">share</i>
					</button>
				</div>
				<div styleName="template-answer">
					<form
						styleName="template-answer-form-container"
						onSubmit={handleFormSubmit}
					>
						<div>
							<div styleName="template-answer-btns-format-container">
								<div styleName="template-answer-btns-format">
									<button
										title="Bold"
										type="button"
										onClick={handleBtnFormatClick}
									>
										<i className="material-icons">format_bold</i>
									</button>
									<button
										title="Italic"
										type="button"
										onClick={handleBtnFormatClick}
									>
										<i className="material-icons">format_italic</i>
									</button>
									<button
										title="Underline"
										type="button"
										onClick={handleBtnFormatClick}
									>
										<i className="material-icons">format_underlined</i>
									</button>
								</div>
								<button type="button">
									<i className="material-icons">emoji_emotions</i>
								</button>
							</div>
							<div styleName="template-input-answer-container">
								<div styleName="template-input-answer-inner-container">
									<div>
										<div
											style={{
												visibility: isPlaceholderVisible ? 'visible' : 'hidden',
											}}
											styleName="template-input-answer-placeholder"
										>
											Escribe tu respuesta...
										</div>
										<div
											styleName="template-input-answer"
											name="ans-msg"
											onInput={handleInput}
											value={answer}
											contentEditable
											ref={ansInput}
											spellCheck="false"
										></div>
									</div>
								</div>
							</div>
						</div>
						<div styleName="template-answer-options-container">
							<div styleName="template-answer-options">
								<button type="button" onClick={toggleOptSwipe} id="bg-colors">
									S
								</button>
								<button type="button" onClick={toggleOptSwipe} id="labels">
									P
								</button>
								<button type="button" onClick={toggleOptSwipe}>
									T
								</button>
								<button type="button" onClick={toggleOptSwipe}>
									M
								</button>
								<button type="button" onClick={toggleOptSwipe}>
									R
								</button>
							</div>
						</div>
						<div
							ref={optsSwipe}
							styleName="template-answer-opts-menu"
							className="opts-swipe_inactv"
						>
							<div
								style={{
									height: optsVisibility.bgColorsOptShown ? '100%' : '0',
								}}
							>
								<BgColors />
							</div>
							<div
								style={{
									height: optsVisibility.labelsOptShown ? '100%' : '0',
								}}
							>
								<Labels />
							</div>
						</div>
					</form>
				</div>
			</div>
			<div styleName="template-question-container">
				<div
					className="d-text-select"
					styleName="template-question"
					ref={templateQuestion}
				>
					""
				</div>
				<div styleName="template-answer-from-question" ref={templateAnswer}>
					<div>{parse(answer)}</div>
				</div>
			</div>
		</div>
	)
}
