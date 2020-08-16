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
            console.log(data);
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

		if (optSwp!.classList.contains('opts-swipe_actv')) {
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
