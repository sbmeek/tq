import React, {
	useState,
	useRef,
	useMemo,
	useCallback,
	useContext,
} from 'react'
import '../Template.css'
import './TemplateEditor.css'
import BgColors from '../templateOpts/BgColors'
import Labels from '../templateOpts/Labels'
import textIcon from 'assets/images/templateEditor-icons/text-icon.svg'
import {
	createEditor,
	Transforms,
	Editor,
	Text,
	Node as SlateNode,
} from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { InitContext } from 'global/context/InitContext'
import { Picker, BaseEmoji } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

interface IProps {
	answer: string
	form: React.RefObject<HTMLFormElement>
	label: React.RefObject<HTMLDivElement>
	setAnswer: React.Dispatch<React.SetStateAction<string>>
	setShowLabel: React.Dispatch<React.SetStateAction<boolean>>
	handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
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
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const {
		lang: { TemplateEditor: lang },
	} = useContext(InitContext).state
	const InitialStateOptsVisibility: { [key: string]: boolean } = {
		bgColorsOptShown: false,
		labelsOptShown: false,
	}
	const [optsVisibility, setOptsVisibility] = useState(
		InitialStateOptsVisibility
	)
	const optsSwipe = useRef<HTMLDivElement>(null)
	const emojiPicker = useRef<Picker>(null)
	const editor = useMemo(() => withReact(createEditor()), [])
	const [editorVal, setEditorVal] = useState<any[]>([
		{
			children: [{ text: '' }],
		},
	])

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

	const toggleOptSwipe = (e: React.MouseEvent<HTMLButtonElement>) => {
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

	const handleEditorChange = (value: SlateNode[]) => {
		setEditorVal(value)
		serialize(value[0])
	}

	const serialize = (node: SlateNode) => {
		if (Text.isText(node)) {
			return setAnswer(node.text)
		}
		let _ans = '<div>'
		node.children.map((n: SlateNode) => {
			// prettier-ignore
			_ans += `<span style="font-weight: ${n.bold ? 'bold' : 'normal'};textDecorationLine:${n.underline ? 'underline' : 'none'};fontStyle:${n.italic ? 'italic' : 'normal'}">${n.text}</span>`
			return _ans
		})
		setAnswer(_ans + '</div>')
	}

	const editorKeyDownHandler = (e: React.KeyboardEvent) => {
		if (!e.ctrlKey) return
		switch (e.key) {
			case 'b':
				e.preventDefault()
				CustomEditor.toggleBoldMark(editor)
				break
			case 'u':
				e.preventDefault()
				CustomEditor.toggleUnderlineMark(editor)
				break
			case 'i':
				e.preventDefault()
				CustomEditor.toggleItalicMark(editor)
				break
		}
	}

	const renderLeaf = useCallback((props: any) => {
		return <Leaf {...props} />
	}, [])

	const insertEmoji = (emojiData: BaseEmoji) => {
		editor.insertText(emojiData.native)
		ReactEditor.focus(editor)
	}

	return (
		<>
			<Picker
				showPreview={false}
				showSkinTones={false}
				onSelect={(e: BaseEmoji) => insertEmoji(e)}
				set="apple"
				theme="dark"
				style={{
                    opacity: showEmojiPicker ? '1' : '0',
                    zIndex: showEmojiPicker ? 4 : -1,
					position: 'absolute',
					top: '1%',
					height: '267px',
					transition: 'opacity 150ms',
				}}
				ref={emojiPicker}
			/>
			<div styleName="answer-editor">
				<form
					styleName="answer-editor-container"
					onSubmit={handleFormSubmit}
					ref={form}
				>
					<div>
						<div styleName="answer-btns-format-container">
							<div styleName="answer-btns-format">
								<button
									title="Bold"
									type="button"
									onClick={(e: React.MouseEvent) => {
										e.preventDefault()
										CustomEditor.toggleBoldMark(editor)
									}}
								>
									<i className="material-icons">format_bold</i>
								</button>
								<button
									title="Italic"
									type="button"
									onClick={(e: React.MouseEvent) => {
										e.preventDefault()
										CustomEditor.toggleItalicMark(editor)
									}}
								>
									<i className="material-icons">format_italic</i>
								</button>
								<button
									title="Underline"
									type="button"
									onClick={(e: React.MouseEvent) => {
										e.preventDefault()
										CustomEditor.toggleUnderlineMark(editor)
									}}
								>
									<i className="material-icons">format_underlined</i>
								</button>
							</div>
							<button
								type="button"
								onClick={() => setShowEmojiPicker(!showEmojiPicker)}
							>
								<i className="material-icons">emoji_emotions</i>
							</button>
						</div>
						<div styleName="input-answer-container">
							<div styleName="input-answer-inner-container">
								<div>
									<Slate
										editor={editor}
										value={editorVal}
										onChange={handleEditorChange}
									>
										<Editable
											placeholder={lang['InputAnswerPlaceholder']}
											renderLeaf={renderLeaf}
											onKeyDown={editorKeyDownHandler}
											autoComplete="off"
											spellCheck="false"
											autoFocus={true}
											data-value={answer}
											data-name="ans-msg"
											styleName="input-answer tq-scrollbar"
										/>
									</Slate>
								</div>
							</div>
						</div>
					</div>
					<div styleName="answer-options-container">
						<div styleName="answer-options tq-scrollbar">
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
						styleName="answer-opts-menu"
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
		</>
	)
}

const Leaf = (props: any) => {
	return (
		<span
			{...props.attributes}
			style={{
				fontWeight: props.leaf.bold ? 'bold' : 'normal',
				textDecorationLine: props.leaf.underline ? 'underline' : 'none',
				fontStyle: props.leaf.italic ? 'italic' : 'normal',
			}}
		>
			{props.children}
		</span>
	)
}

const CustomEditor = {
	isBoldMarkActive(editor: Editor & ReactEditor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.bold === true,
			universal: true,
		})

		return !!match
	},

	isUnderlineMarkActive(editor: Editor & ReactEditor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.underline === true,
		})
		return match
	},

	isItalicMarkActive(editor: Editor & ReactEditor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.italic === true,
		})
		return match
	},

	toggleBoldMark(editor: Editor & ReactEditor) {
		const isActive = CustomEditor.isBoldMarkActive(editor)
		Transforms.setNodes(
			editor,
			{ bold: isActive ? null : true },
			{ match: (n) => Text.isText(n), split: true }
		)
		ReactEditor.focus(editor)
	},

	toggleUnderlineMark(editor: Editor & ReactEditor) {
		const isActive = CustomEditor.isUnderlineMarkActive(editor)
		Transforms.setNodes(
			editor,
			{ underline: isActive ? false : true },
			{ match: (n) => Text.isText(n), split: true }
		)
		ReactEditor.focus(editor)
	},

	toggleItalicMark(editor: Editor & ReactEditor) {
		const isActive = CustomEditor.isItalicMarkActive(editor)
		Transforms.setNodes(
			editor,
			{ italic: isActive ? false : true },
			{ match: (n) => Text.isText(n), split: true }
		)
		ReactEditor.focus(editor)
	},
}
