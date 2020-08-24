import React, {
	useState,
	MouseEvent,
	KeyboardEvent,
	useRef,
	FormEvent,
} from 'react'
import '../Template.css'
import './TemplateEditor.css'
import BgColors from '../templateOpts/BgColors'
import Labels from '../templateOpts/Labels'
import textIcon from 'assets/images/templateEditor-icons/text-icon.svg';

interface IProps {
	answer: string
    form: React.RefObject<HTMLFormElement>
    label: React.RefObject<HTMLDivElement>
	setAnswer: React.Dispatch<React.SetStateAction<string>>
    setShowLabel: React.Dispatch<React.SetStateAction<boolean>>
    handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void
    templateQuestionContainer: HTMLDivElement | null
}

export default function TemplateEditor({
    form,
    label,
	answer,
	setAnswer,
    setShowLabel,
    handleFormSubmit,
    templateQuestionContainer,
}: IProps) {
	const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true)
	const InitialStateOptsVisibility: { [key: string]: boolean } = {
		bgColorsOptShown: false,
		labelsOptShown: false,
	}
	const [optsVisibility, setOptsVisibility] = useState(
		InitialStateOptsVisibility
	)
	const ansInput = useRef<HTMLDivElement>(null)
	const optsSwipe = useRef<HTMLDivElement>(null)

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

	const handleInput = (e: KeyboardEvent<HTMLDivElement>) => {
		const targetElement = e.currentTarget as HTMLDivElement
		const { textContent: ansVal } = targetElement
		setIsPlaceholderVisible(ansVal!.length < 1)
		setAnswer(targetElement.innerHTML)
	}

	const handleBtnFormatClick = (e: MouseEvent<HTMLButtonElement>) => {
		const targetElement = e.target as HTMLButtonElement
		const sel = window.getSelection()
		console.log(
			sel!.getRangeAt(0).commonAncestorContainer.parentElement,
			sel?.toString()
		)
		const { parentElement: target } = targetElement
		formatAnswer(target!.title.toLowerCase())
	}

	const formatAnswer = (cmd: string) => {
		document.execCommand(cmd, false, '')
		setAnswer(ansInput.current!.innerHTML)
		ansInput.current!.focus()
	}

	return (
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
								data-cmd="b"
							>
								<i className="material-icons">format_bold</i>
							</button>
							<button
								title="Italic"
								type="button"
								onClick={handleBtnFormatClick}
								data-cmd="i"
							>
								<i className="material-icons">format_italic</i>
							</button>
							<button
								title="Underline"
								type="button"
								onClick={handleBtnFormatClick}
								data-cmd="u"
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
									styleName="template-input-answer tq-scrollbar"
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
					<div styleName="template-answer-options tq-scrollbar">
						<button type="button" onClick={toggleOptSwipe} id="text">
                            <img src={textIcon} alt="text icon" />
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
							templateQuestionContainer={templateQuestionContainer!}
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
	)
}
