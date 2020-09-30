import React, { useState, useRef, useContext, useEffect } from 'react';
import '../Template.css';
import './quill.tq-snow.css';
import './quill-emoji.css';
import styles from './TemplateEditor.css';
import BgColors from '../templateOpts/BgColors';
import Labels from '../templateOpts/Labels';
import textIcon from 'assets/images/icons/templateEditor-icons/text-icon.svg';
import stickers from 'assets/images/icons/templateEditor-icons/icon-stickers-minol.svg';
import labelicon from 'assets/images/icons/templateEditor-icons/icon-labels-btn.svg';
import bg from 'assets/images/icons/templateEditor-icons/icon-background-btn.svg';
import org from 'assets/images/icons/templateEditor-icons/icon-organization-btn.svg';
import xIcon from 'assets/images/icons/share-icons/icon-x.svg';
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import { InitContext } from 'global/context/InitContext';

interface IProps {
	answer: string;
	form: React.RefObject<HTMLFormElement>;
	label: React.RefObject<HTMLDivElement>;
	setAnswer: React.Dispatch<React.SetStateAction<string>>;
	setShowLabel: React.Dispatch<React.SetStateAction<boolean>>;
	handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	templateQuestionContainer: HTMLDivElement | null;
	isMobile: boolean;
	setShowMobileEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TemplateEditor({
	form,
	label,
	answer,
	setAnswer,
	setShowLabel,
	handleFormSubmit,
	templateQuestionContainer,
	isMobile,
	setShowMobileEditor,
}: IProps) {
	const InitialEditorToolsState: { [key: string]: boolean } = {
		showTextTool: false,
		showBgColorsTool: false,
		showLabelsTool: false,
	};
	const [showToolsContainer, setShowToolsContainer] = useState(false);
	const [toolsVisibility, setToolsVisibility] = useState(
		InitialEditorToolsState
	);
	const [shouldAnimToolToggle, setShouldAnimToolToggle] = useState(false);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const editorToolsContainer = useRef<HTMLDivElement>(null);

	const toggleEditorTool = (e: React.MouseEvent<HTMLButtonElement>) => {
		const targetElement = e.target as HTMLButtonElement;

		let clickedTool = (() => {
			switch (targetElement.id) {
				case 'bg-colors':
					return 'showBgColorsTool';
				case 'labels':
					return 'showLabelsTool';
				case 'text':
					return 'showTextTool';
				default:
					return '';
			}
		})();

		for (let t in toolsVisibility) {
			if (toolsVisibility[t] && t !== clickedTool && isMobile) {
				setShouldAnimToolToggle(true);
				editorToolsContainer.current!.addEventListener(
					'animationend',
					(e) => {
						if (e.animationName === styles['contToggleOpt']) {
							setShouldAnimToolToggle(false);
						}
					}
				);
			}
		}

		let _editorToolsVisibility = {
			...InitialEditorToolsState,
			[clickedTool]: true,
		};

		if (showToolsContainer) {
			/*
                If the clicked option is already being shown:
                    The tools editor container will be hidden 
                    and the toolsVisibility state will be set to default.

                If not (In the else statement) the toolsVisibility state will be set
                    to default but with the clicked tool as true.
            */
			if (toolsVisibility[clickedTool]) {
				setShowToolsContainer(false);
				_editorToolsVisibility = InitialEditorToolsState;
			} else {
				_editorToolsVisibility = {
					...InitialEditorToolsState,
					[clickedTool]: true,
				};
			}
		} else {
			setShowToolsContainer(true);
		}

		//If the T(ext) option is clicked the default page will be shown
		if (targetElement.id === 'text' && !isMobile) {
			_editorToolsVisibility = {
				...InitialEditorToolsState,
				showTextTool: true,
			};
			setShowToolsContainer(false);
		}

		setToolsVisibility(_editorToolsVisibility);
	};

	const hideMobileOpts = () => {
		setShowToolsContainer(false);
		setToolsVisibility(InitialEditorToolsState);
		setShowMobileEditor(false);
	};

	return (
		<div styleName="answer-editor">
			<form
				styleName="answer-editor-container"
				onSubmit={handleFormSubmit}
				ref={form}
			>
				<TextEditor
					answer={answer}
					showEmojiPicker={showEmojiPicker}
					setAnswer={setAnswer}
					setShowEmojiPicker={setShowEmojiPicker}
				/>
				<div styleName="answer-options-container">
					<div styleName="answer-options tq-scrollbar">
						{isMobile && (
							<button type="button" onClick={hideMobileOpts}>
								<img src={xIcon} alt="x icon" />
							</button>
						)}
						<button
							styleName={`${
								toolsVisibility.showTextTool ? 'selected' : ''
							}`}
							type="button"
							onClick={toggleEditorTool}
							id="text"
							style={{ alignItems: 'center' }}
						>
							<img src={textIcon} alt="text icon" />
						</button>
						<button
							styleName={`${
								toolsVisibility.showBgColorsTool
									? 'selected'
									: ''
							}`}
							type="button"
							onClick={toggleEditorTool}
							id="bg-colors"
						>
							<img src={bg} alt="icon" />
						</button>
						<button
							styleName={`${
								toolsVisibility.showLabelsTool ? 'selected' : ''
							}`}
							type="button"
							onClick={toggleEditorTool}
							id="labels"
						>
							<img src={labelicon} alt=" icon" />
						</button>
						<button type="button" onClick={toggleEditorTool}>
							<img src={stickers} alt="icon" />
						</button>
						<button type="button" onClick={toggleEditorTool}>
							<img src={org} alt="icon" />
						</button>
					</div>
				</div>
				<div
					ref={editorToolsContainer}
					styleName={`answer-opts-menu ${
						showToolsContainer ? 'opts-swipe_actv' : ''
					} ${shouldAnimToolToggle ? 'anim-tool-toggle' : ''}`}
				>
					{isMobile && (
						<span
							styleName="opt-stick-container"
							onClick={hideMobileOpts}
						>
							<span styleName="opt-stick"></span>
						</span>
					)}
					<div
						styleName={`${
							toolsVisibility.showTextTool
								? 'toggle-opt-anim'
								: ''
						}`}
					>
						{isMobile && (
							<TextEditor
								answer={answer}
								showEmojiPicker={showEmojiPicker}
								setAnswer={setAnswer}
								setShowEmojiPicker={setShowEmojiPicker}
							/>
						)}
					</div>
					<div
						styleName={`${
							toolsVisibility.showBgColorsTool
								? 'toggle-opt-anim'
								: ''
						}`}
					>
						<BgColors
							templateQuestionContainer={
								templateQuestionContainer!
							}
						/>
					</div>
					<div
						styleName={`${
							toolsVisibility.showLabelsTool
								? 'toggle-opt-anim'
								: ''
						}`}
					>
						<Labels
							label={label.current!}
							setShowLabel={setShowLabel}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

function TextEditor<
	T extends {
		answer: string;
		setAnswer: React.Dispatch<React.SetStateAction<string>>;
	}
>({ answer, setAnswer }: T) {
	const [editorVal, setEditorVal] = useState('');
	const {
		lang: { TemplateEditor: lang },
	} = useContext(InitContext).state;
	const editorRef = useRef<ReactQuill>(null);

	useEffect(() => {
		editorRef.current!.getEditor().root.setAttribute('spellcheck', 'false');
	}, []);

	useEffect(() => {
		const {
			EmojiBlot,
			ShortNameEmoji,
			ToolbarEmoji,
			TextAreaEmoji,
		} = quillEmoji;

		Quill.register(
			{
				'formats/emoji': EmojiBlot,
				'modules/emoji-shortname': ShortNameEmoji,
				'modules/emoji-toolbar': ToolbarEmoji,
				'modules/emoji-textarea': TextAreaEmoji,
			},
			true
		);
	}, []);

	const handleEditorChange = (content: string) => {
		setEditorVal(content);
		setAnswer(content);
	};

	return (
		<div styleName="text-editor-container">
			<div styleName="input-answer-container">
				<div styleName="input-answer-inner-container">
					<ReactQuill
						ref={editorRef}
						theme="snow"
						modules={{
							toolbar: [
								['bold', 'italic', 'underline', 'strike'],
								['emoji'],
							],
							'emoji-toolbar': true,
							'emoji-textarea': false,
							'emoji-shortname': true,
						}}
						placeholder={lang['InputAnswerPlaceholder']}
						value={editorVal}
						onChange={handleEditorChange}
						formats={[
							'bold',
							'italic',
							'underline',
							'strike',
							'emoji',
						]}
						data-value={answer}
					/>
				</div>
			</div>
		</div>
	);
}
