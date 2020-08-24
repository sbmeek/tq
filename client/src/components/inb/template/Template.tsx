import React, {
	useState,
	useEffect,
	useRef,
	MouseEvent,
	FormEvent,
	useContext,
} from 'react'
import { useLocation, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import styles from './Template.css'
import ReplyingModal from '../replyingModal/ReplyingModal'
import TemplateEditor from './templateEditor/TemplateEditor'
import { InitContext } from 'global/context/InitContext'

export default function Template() {
	const [answer, setAnswer] = useState<string>('')
	const [showLabel, setShowLabel] = useState<boolean>(false)
	const [actualMsg, setActualMsg] = useState<ITQMessage>()
	const [isReplyingModalOpened, setIsReplyingModalOpened] = useState(false)
	const templateQuestion = useRef<HTMLDivElement>(null)
	const templateAnswer = useRef<HTMLDivElement>(null)
	const templateQuestionContainer = useRef<HTMLDivElement>(null)
	const label = useRef<HTMLDivElement>(null)
	const form = useRef<HTMLFormElement>(null)
	const location = useLocation<ITQMessage>()
	const {
		state: { socket },
	} = useContext(InitContext)

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
						onClick={() => setIsReplyingModalOpened(!isReplyingModalOpened)}
					>
						⇨
					</button>
				</div>
				<ReplyingModal
					opened={isReplyingModalOpened}
					setOpened={setIsReplyingModalOpened}
					form={form.current as HTMLFormElement}
					templateQuestion={templateQuestionContainer.current as HTMLDivElement}
				/>
				<TemplateEditor
                    form={form}
                    label={label}
					answer={answer}
                    setAnswer={setAnswer}
                    setShowLabel={setShowLabel}
                    handleFormSubmit={handleFormSubmit}
                    templateQuestionContainer={templateQuestionContainer!.current}
				/>
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
