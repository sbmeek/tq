import React, {
	useState,
	useContext,
	useEffect,
	useRef,
	FormEvent,
	KeyboardEvent,
	MouseEvent,
} from 'react'
import { useLocation, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { InitContext } from '../../global/context/InitContext'
import styles from './Template.css'
import BgColors from './TemplateOpts/BgColors'
import Labels from './TemplateOpts/Labels'
import AnswerOverlay from './Answer'

interface IOptsVisibility {
	bgColorsOptShown: boolean
	labelsOptShown: boolean
	[key: string]: boolean
}

export default function Template() {
	const [answer, setAnswer] = useState<string>('')
	const [showLabel, setShowLabel] = useState<boolean>(false)
	const [actualMsg, setActualMsg] = useState<ITQMessage>()
    const [isAnswerOverlayOpened, setIsAnswerOverlayOpened] = useState(false)
	const InitialStateOptsVisibility: IOptsVisibility = {
		bgColorsOptShown: false,
		labelsOptShown: false,
	}
	const [optsVisibility, setOptsVisibility] = useState<IOptsVisibility>(
		InitialStateOptsVisibility
	)
	const [isPlaceholderVisible, setIsPlaceholderVisible] = useState<boolean>(
		true
	)
	const {
		state: { socket },
	} = useContext(InitContext)
	const templateQuestion = useRef<HTMLDivElement>(null)
	const templateAnswer = useRef<HTMLDivElement>(null)
	const templateQuestionContainer = useRef<HTMLDivElement>(null)
	const ansInput = useRef<HTMLDivElement>(null)
	const optsSwipe = useRef<HTMLDivElement>(null)
	const label = useRef<HTMLDivElement>(null)
	const form = useRef<HTMLFormElement>(null)
	const location = useLocation<ITQMessage>()

	useEffect(() => {
		const msg = (location.state as any)['actualMsg'] as ITQMessage
		setActualMsg(msg)
		templateAnswer.current!.focus()
		templateQuestion.current!.innerHTML = `"${msg!.content}"`
	}, [location, actualMsg])

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let data = { answer, _id: '' }
		data._id = actualMsg!._id
		socket.emit('msg:ans', data)
		socket.on('msg:ans', (_data: Object) => {
			console.log(data)
			// if (data.success) {
			// 	//success
			// }
		})
	}

	const handleInput = async (e: KeyboardEvent<HTMLDivElement>) => {
		const targetElement = e.currentTarget as HTMLDivElement
		const { textContent: ansVal } = targetElement
		setIsPlaceholderVisible(ansVal!.length < 1)
		await setAnswer(targetElement.innerHTML)
	}

	const handleBtnFormatClick = (e: MouseEvent<HTMLButtonElement>) => {
		const targetElement = e.target as HTMLButtonElement
		const { parentElement: target } = targetElement
		formatAnswer(target!.title.toLowerCase())
	}

	const formatAnswer = (cmd: string) => {
		document.execCommand(cmd, false, '')
		setAnswer(ansInput.current!.innerHTML)
		ansInput.current!.focus()
	}

	const toggleOptSwipe = (e: MouseEvent<HTMLButtonElement>) => {
		const targetElement = e.target as HTMLButtonElement
		const optSwp = optsSwipe.current!
		let _dsrdOpt = getDesiredOpt(targetElement.id)
		let desiredOpt = Object.keys(_dsrdOpt)[0]
		let _optsVisibility = {
			...InitialStateOptsVisibility,
			[Object.keys(_dsrdOpt)[0]]: true,
        }
        
		if (targetElement.id === 'text')
			_optsVisibility = InitialStateOptsVisibility

		if (optSwp!.classList.contains('opts-swipe_actv')) {
			if (optsVisibility[desiredOpt]) {
				optSwp.classList.remove('opts-swipe_actv')
				_optsVisibility = InitialStateOptsVisibility
			} else {
				_optsVisibility = {
					...InitialStateOptsVisibility,
					[Object.keys(_dsrdOpt)[0]]: true,
				}
			}
		} else {
			optSwp.classList.toggle('opts-swipe_actv')
		}
		if (targetElement.id === 'text') optSwp.classList.remove('opts-swipe_actv')
		setOptsVisibility(_optsVisibility)
	}

	const getDesiredOpt = (_id: string) => {
		switch (_id) {
			case 'bg-colors':
				return { bgColorsOptShown: true }
			case 'labels':
				return { labelsOptShown: true }
			default:
				return {}
		}
	}

	const toggleLabelHandler = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		const targetElement = e.target as HTMLDivElement
		if (
			label.current!.classList.contains(
				styles['template-question-label-active']
			)
		) {
			switch (e.type) {
				case 'mouseenter':
					targetElement.classList.add(styles['remove-label'])
					break
				case 'click':
					label.current!.classList.remove(styles['remove-label'])
					break
			}
		}
	}

	return (
		<div
			styleName="template-container"
			id="tmpt-cont"
			onClick={toggleLabelHandler}
		>
			<div>
				<div styleName="template-head-btns">
					<Link to="/messages" styleName="template-btn-back">
						<i className="material-icons">keyboard_backspace</i>
					</Link>
					<button
						styleName="template-btn-share"
						onClick={() => setIsAnswerOverlayOpened(!isAnswerOverlayOpened)}
					>
						⇨
					</button>
				</div>
				<AnswerOverlay
					opened={isAnswerOverlayOpened}
					setOpened={setIsAnswerOverlayOpened}
					form={form.current as HTMLFormElement}
                    templateQuestion={templateQuestionContainer.current as HTMLDivElement}
				/>
				<div styleName="template-answer">
					<form
						styleName="template-answer-form-container"
						onSubmit={handleFormSubmit}
						ref={form}
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
											data-name="ans-msg"
											onInput={handleInput}
											data-value={answer}
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
								<button type="button" onClick={toggleOptSwipe} id="text">
									<svg
										width="100%"
										height="100%"
										viewBox="0 0 1080 1080"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										xmlSpace="preserve"
										style={{
											fillRule: 'evenodd',
											clipRule: 'evenodd',
											strokeLinecap: 'round',
											strokeLinejoin: 'round',
											strokeMiterlimit: 1.5,
										}}
									>
										<rect
											id="Artboard1"
											x="0"
											y="0"
											width="1080"
											height="1080"
											style={{ fill: 'none' }}
										/>
										<g id="Artboard11">
											<path
												d="M270.271,1040.47c-8.111,0 -15.89,-3.222 -21.626,-8.957c-5.735,-5.736 -8.957,-13.515 -8.957,-21.626c-0,-0.02 -0,-0.04 -0,-0.06c0.005,-16.218 11.965,-29.95 28.028,-32.183c18.421,-1.443 31.953,-5.344 40.656,-11.287c12.665,-8.648 18.998,-23.543 18.998,-44.684c-0,0 -0,-354.375 -0,-589.717c-0,-54.256 -21.553,-106.289 -59.918,-144.654c-38.364,-38.364 -90.397,-59.917 -144.653,-59.917c-0.013,0 -0.02,0 -0.02,0c-17.329,0 -46.312,15.014 -72.847,34.609c-9.663,6.768 -22.378,7.302 -32.575,1.37c-10.197,-5.933 -16.016,-17.251 -14.908,-28.996c-0.032,-1.144 -0.049,-0.856 0,-1.372c4.976,-52.748 46.827,-93.474 99.81,-93.474c152.115,-0 451.338,-0 601.807,-0c51.583,-0 94.733,39.174 99.703,90.517c0.043,0.448 0.087,0.897 0.13,1.345c1.235,12.847 -5.069,25.25 -16.174,31.827c-11.105,6.576 -25.011,6.14 -35.683,-1.119c-25.66,-20.715 -55.565,-34.707 -73.945,-34.707c0,0 -0.007,0 -0.02,0c-54.256,0 -106.289,21.553 -144.653,59.917c-38.365,38.365 -59.918,90.398 -59.918,144.654c0,235.342 0,589.717 0,589.717c0,21.141 6.333,36.036 18.998,44.684c8.703,5.943 22.235,9.844 40.598,11.703c15.854,2.204 27.655,15.76 27.655,31.767c0.431,0.02 0.431,0.04 0.431,0.06c0,8.111 -3.222,15.89 -8.958,21.626c-5.735,5.735 -13.514,8.957 -21.625,8.957c-61.383,0 -198.951,0 -260.334,0Z"
												style={{ fill: '#fff', fillRule: 'nonzero' }}
											/>
											<path
												d="M1054,39.526l0,1000.95"
												style={{
													fill: 'none',
													stroke: '#fff',
													strokeWidth: '43.63px',
												}}
											/>
										</g>
									</svg>
								</button>
								<button type="button" onClick={toggleOptSwipe} id="bg-colors">
									S
								</button>
								<button type="button" onClick={toggleOptSwipe} id="labels">
									P
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
								<BgColors
									templateQuestionContainer={templateQuestionContainer.current!}
								/>
							</div>
							<div
								style={{
									height: optsVisibility.labelsOptShown ? '100%' : '0',
								}}
							>
								<Labels label={label.current!} setShowLabel={setShowLabel} />
							</div>
						</div>
					</form>
				</div>
			</div>
			<div
				styleName="template-question-container"
                ref={templateQuestionContainer}
				className="d-text-select"
			>
				<div
					styleName={`template-question-label ${
						showLabel ? 'template-question-label-active' : ''
					}`}
					ref={label}
					onMouseEnter={toggleLabelHandler}
				></div>
				<div styleName="remove-label-box" onClick={() => setShowLabel(false)}>
					✕
				</div>
				<div styleName="template-question" ref={templateQuestion}>
					""
				</div>
				<div styleName="template-answer-from-question" ref={templateAnswer}>
					<div>{parse(answer)}</div>
				</div>
			</div>
		</div>
	)
}
