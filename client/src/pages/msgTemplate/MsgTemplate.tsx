import React, {
	useState,
	useEffect,
	useRef,
	MouseEvent,
	FormEvent,
	useContext,
	useCallback
} from 'react';
import parse from 'html-react-parser';
import ReplyingModal from 'components/replyingModal/ReplyingModal';
import TemplateEditor from 'components/templateEditor/TemplateEditor';
import { InitContext } from 'global/context/InitContext';
import arrowanswer from 'assets/images/icons/icons-inbox/icon-arrow-answer.svg';
import arrowexit from 'assets/images/icons/icons-inbox/icon-exit.svg';
import xIcon from 'assets/images/icons/share-icons/icon-x.svg';
import { useHistory, useLocation } from 'react-router-dom';

import {
	AnswerPreview,
	BtnBack,
	BtnRemoveLabel,
	BtnShare,
	BtnToggleEditorBar,
	Container,
	DisableMenucitoStyle,
	EditorContainer,
	HeadContainer,
	Label,
	MobileEditorContainer,
	Question,
	QuestionContainer,
	Sticker
} from './MsgTemplate.style';

export default function Template() {
	const [answer, setAnswer] = useState<string>('');
	const [showLabel, setShowLabel] = useState<boolean>(false);
	const [showRemoveLabel, setShowRemoveLabel] = useState(false);
	const [actualMsg, setActualMsg] = useState<ITQMessage>();
	const [isReplyingModalOpened, setIsReplyingModalOpened] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [showMobileEditor, setShowMobileEditor] = useState(false);
	const [selectedSticker, setSelectedSticker] = useState('');
	const [runToggleStickerAnim, setRunToggleStickerAnim] = useState(false);
	const templateQuestion = useRef<HTMLDivElement>(null);
	const templateAnswer = useRef<HTMLDivElement>(null);
	const templateQuestionContainer = useRef<HTMLDivElement>(null);
	const label = useRef<HTMLDivElement>(null);
	const form = useRef<HTMLFormElement>(null);
	const location = useLocation<ITQMessage>();
	const history = useHistory();
	const {
		state: { socket }
	} = useContext(InitContext);

	const checkScreenSize = () => {
		setIsMobile(document.documentElement.clientWidth <= 490);
	};

	useEffect(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	useEffect(() => {
		const actualMsgInState = (location.state as any)['actualMsg'] as ITQMessage;
		if (actualMsgInState !== undefined) {
			setActualMsg(actualMsgInState);
			templateAnswer.current!.focus();
			templateQuestion.current!.innerHTML = `"${actualMsgInState!.content}"`;
		} else {
			history.push('/messages', {
				actualMsg: undefined
			});
		}
	}, [location, actualMsg, history]);

	const handleStickerAnimationEnd = useCallback(() => {
		setRunToggleStickerAnim(false);
	}, []);

	useEffect(() => {
		setRunToggleStickerAnim(true);
	}, [selectedSticker, handleStickerAnimationEnd]);

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let data = { answer, _id: '' };
		data._id = actualMsg!._id;
		socket.emit('msg:ans', data);
		socket.on('msg:ans', (_data: Object) => {
			console.log(data, _data);
		});
	};

	const toggleLabelHandler = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (showLabel) {
			switch (e.type) {
				case 'mouseenter':
					setShowRemoveLabel(true);
					break;
				case 'click':
					setShowRemoveLabel(false);
					break;
			}
		}
	};

	return (
		<Container onClick={toggleLabelHandler}>
			<ReplyingModal
				opened={isReplyingModalOpened}
				setOpened={setIsReplyingModalOpened}
				form={form.current as HTMLFormElement}
				templateQuestion={templateQuestionContainer.current as HTMLDivElement}
			/>
			<div>
				<HeadContainer>
					<BtnBack to="/messages">
						<img src={arrowexit} alt="arrow" />
					</BtnBack>
					<BtnShare
						onClick={() => setIsReplyingModalOpened(!isReplyingModalOpened)}
					>
						<img src={arrowanswer} alt="arrow" />
					</BtnShare>
				</HeadContainer>
				{!isMobile && (
					<EditorContainer>
						<TemplateEditor
							form={form}
							label={label}
							answer={answer}
							setAnswer={setAnswer}
							setShowLabel={setShowLabel}
							handleFormSubmit={handleFormSubmit}
							templateQuestionContainer={templateQuestionContainer!.current}
							isMobile={isMobile}
							setShowMobileEditor={setShowMobileEditor}
							setSelectedSticker={setSelectedSticker}
						/>
					</EditorContainer>
				)}
			</div>
			<QuestionContainer
				ref={templateQuestionContainer}
				className="d-text-select"
			>
				<div>
					<Label
						isLabelActive={showLabel}
						ref={label}
						onMouseEnter={toggleLabelHandler}
					></Label>
					<BtnRemoveLabel
						isRemoveLabelActive={showRemoveLabel}
						onClick={() => setShowLabel(false)}
					>
						<img src={xIcon} alt="x" />
					</BtnRemoveLabel>
					<Question ref={templateQuestion}>""</Question>
					<AnswerPreview ref={templateAnswer}>
						<div>{parse(answer)}</div>
					</AnswerPreview>
					{selectedSticker !== '' && (
						<Sticker
							runToggleStickerAnim={runToggleStickerAnim}
							onAnimationEnd={() => setRunToggleStickerAnim(false)}
						>
							<img src={selectedSticker} alt="sticker" />
						</Sticker>
					)}
				</div>
				{isMobile && (
					<>
						<DisableMenucitoStyle />
						<BtnToggleEditorBar
							onClick={() => setShowMobileEditor(true)}
							isActive={!showMobileEditor}
						>
							L
						</BtnToggleEditorBar>
						<MobileEditorContainer showMobileEditor={showMobileEditor}>
							<TemplateEditor
								form={form}
								label={label}
								answer={answer}
								setAnswer={setAnswer}
								setShowLabel={setShowLabel}
								isMobile={isMobile}
								setShowMobileEditor={setShowMobileEditor}
								handleFormSubmit={handleFormSubmit}
								templateQuestionContainer={templateQuestionContainer!.current}
								setSelectedSticker={setSelectedSticker}
							/>
						</MobileEditorContainer>
					</>
				)}
			</QuestionContainer>
		</Container>
	);
}
