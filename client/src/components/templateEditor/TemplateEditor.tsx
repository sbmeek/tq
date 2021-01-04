import React, { useState, useRef, useContext, useEffect } from 'react';
import BgColors from './templateEditorTools/bgColors/BgColors';
import Labels from './templateEditorTools/labels/Labels';
import Stickers from './templateEditorTools/stickers/Stickers';

import textIcon from 'assets/images/icons/templateEditor-icons/text-icon.svg';
import stickersIcon from 'assets/images/icons/templateEditor-icons/icon-stickers-minol.svg';
import labelicon from 'assets/images/icons/templateEditor-icons/icon-labels-btn.svg';
import bg from 'assets/images/icons/templateEditor-icons/icon-background-btn.svg';
import org from 'assets/images/icons/templateEditor-icons/icon-organization-btn.svg';
import xIcon from 'assets/images/icons/share-icons/icon-x.svg';
import boldIcon from 'assets/images/icons/templateEditor-icons/icons-message/icon-bold.svg';
import italicIcon from 'assets/images/icons/templateEditor-icons/icons-message/icon-italic.svg';
import underlinedIcon from 'assets/images/icons/templateEditor-icons/icons-message/icon-underlined.svg';
import strikethroughIcon from 'assets/images/icons/templateEditor-icons/icons-message/icon-strikethrough.svg';
import emojiFinderIcon from 'assets/images/icons/templateEditor-icons/icons-message/iconfinder-Smile.svg';
import ReactQuill, { Quill } from 'react-quill';
import quillEmoji from 'quill-emoji';
import { InitContext } from 'global/context/InitContext';

import {
	Container,
	Form,
	OptsContainer,
	OptsInnerContainer,
	AnswerOptsMenu,
	TextEditorContainer,
	InputAnswerContainer,
	InputAnswerInnerContainer,
	OptStick,
	OptStickContainer
} from './TemplateEditor.style';
import styles from './TemplateEditor.css';
import './quill.tq-snow.css';
import './quill-emoji.css';

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
	setSelectedSticker: React.Dispatch<React.SetStateAction<string>>;
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
	setSelectedSticker
}: IProps) {
	const InitialEditorToolsState: { [key: string]: boolean } = {
		showTextTool: false,
		showBgColorsTool: false,
		showLabelsTool: false,
		showStickersTool: false
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
				case 'stickers':
					return 'showStickersTool';
				case 'text':
					return 'showTextTool';
				default:
					return '';
			}
		})();

		for (let t in toolsVisibility) {
			if (toolsVisibility[t] && t !== clickedTool && isMobile) {
				setShouldAnimToolToggle(true);
				editorToolsContainer.current!.addEventListener('animationend', (e) => {
					if (e.animationName === styles['contToggleOpt']) {
						setShouldAnimToolToggle(false);
					}
				});
			}
		}

		let _editorToolsVisibility = {
			...InitialEditorToolsState,
			[clickedTool]: true
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
					[clickedTool]: true
				};
			}
		} else {
			setShowToolsContainer(true);
		}

		//If the T(ext) option is clicked the default page will be shown
		if (targetElement.id === 'text' && !isMobile) {
			_editorToolsVisibility = {
				...InitialEditorToolsState,
				showTextTool: true
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
		<Container>
			<Form onSubmit={handleFormSubmit} ref={form}>
				<TextEditor
					answer={answer}
					showEmojiPicker={showEmojiPicker}
					setAnswer={setAnswer}
					setShowEmojiPicker={setShowEmojiPicker}
					id="desktop-text-editor"
				/>
				<OptsContainer>
					<OptsInnerContainer>
						{isMobile && (
							<button type="button" onClick={hideMobileOpts}>
								<img src={xIcon} alt="x icon" />
							</button>
						)}
						<button
							className={`${toolsVisibility.showTextTool ? 'selected' : ''}`}
							type="button"
							onClick={toggleEditorTool}
							id="text"
							style={{ alignItems: 'center' }}
						>
							<img src={textIcon} alt="text icon" />
						</button>
						<button
							className={`${
								toolsVisibility.showBgColorsTool ? 'selected' : ''
							}`}
							type="button"
							onClick={toggleEditorTool}
							id="bg-colors"
						>
							<img src={bg} alt="icon" />
						</button>
						<button
							className={`${toolsVisibility.showLabelsTool ? 'selected' : ''}`}
							type="button"
							onClick={toggleEditorTool}
							id="labels"
						>
							<img src={labelicon} alt=" icon" />
						</button>
						<button
							className={`${
								toolsVisibility.showStickersTool ? 'selected' : ''
							}`}
							type="button"
							onClick={toggleEditorTool}
							id="stickers"
						>
							<img src={stickersIcon} alt="icon" />
						</button>
						<button type="button" onClick={toggleEditorTool}>
							<img src={org} alt="icon" />
						</button>
					</OptsInnerContainer>
				</OptsContainer>
				<AnswerOptsMenu
					ref={editorToolsContainer}
					showToolsContainer={showToolsContainer}
					shouldAnimToolToggle={shouldAnimToolToggle}
				>
					{isMobile && (
						<OptStickContainer onClick={hideMobileOpts}>
							<OptStick />
						</OptStickContainer>
					)}
					<div
						className={`${
							toolsVisibility.showTextTool ? 'toggle-opt-anim' : ''
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
						className={`${
							toolsVisibility.showBgColorsTool ? 'toggle-opt-anim' : ''
						}`}
					>
						<BgColors templateQuestionContainer={templateQuestionContainer!} />
					</div>
					<div
						className={`${
							toolsVisibility.showLabelsTool ? 'toggle-opt-anim' : ''
						}`}
					>
						<Labels label={label.current!} setShowLabel={setShowLabel} />
					</div>
					<div
						className={`${
							toolsVisibility.showStickersTool ? 'toggle-opt-anim' : ''
						}`}
					>
						<Stickers setSelectedSticker={setSelectedSticker} />
					</div>
				</AnswerOptsMenu>
			</Form>
		</Container>
	);
}

const icons = ReactQuill.Quill.import('ui/icons');
icons['bold'] = `<img style="width: 15.2px;" src=${boldIcon} alt="B" />`;
icons['italic'] = `<img style="width: 15.2px;" src=${italicIcon} alt="I" />`;
icons[
	'underline'
] = `<img style="width: 15.2px;" src=${underlinedIcon} alt="U" />`;
icons[
	'strike'
] = `<img style="width: 15.2px;" src=${strikethroughIcon} alt="S" />`;
const emojiIcon = `<img style="width: 24.2px;" src=${emojiFinderIcon} alt=":D" />`;

function TextEditor<
	T extends {
		id?: string;
		answer: string;
		setAnswer: React.Dispatch<React.SetStateAction<string>>;
	}
>({ id, answer, setAnswer }: T) {
	const [editorVal, setEditorVal] = useState('');
	const {
		lang: { TemplateEditor: lang }
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
			TextAreaEmoji
		} = quillEmoji;

		Quill.register(
			{
				'formats/emoji': EmojiBlot,
				'modules/emoji-shortname': ShortNameEmoji,
				'modules/emoji-toolbar': ToolbarEmoji,
				'modules/emoji-textarea': TextAreaEmoji
			},
			true
		);
	}, []);

	const handleEditorChange = (content: string) => {
		setEditorVal(content);
		setAnswer(content);
	};

	return (
		<TextEditorContainer id={id}>
			<div><h1>message</h1></div>
			<InputAnswerContainer>
				<InputAnswerInnerContainer>
					<ReactQuill
						ref={editorRef}
						theme="snow"
						modules={{
							toolbar: [['bold', 'italic', 'underline', 'strike'], ['emoji']],
							'emoji-toolbar': {
								buttonIcon: emojiIcon
							},
							'emoji-textarea': false,
							'emoji-shortname': true
						}}
						placeholder={lang['InputAnswerPlaceholder']}
						value={editorVal}
						onChange={handleEditorChange}
						formats={['bold', 'italic', 'underline', 'strike', 'emoji']}
						data-value={answer}
					/>
				</InputAnswerInnerContainer>
			</InputAnswerContainer>
		</TextEditorContainer>
	);
}
