import React, {
	useState,
	useEffect,
	useRef,
	MouseEvent,
	FormEvent,
	useContext,
	useCallback
} from 'react';
import { useLocation, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import ReplyingModal from 'components/replyingModal/ReplyingModal';
import TemplateEditor from 'components/templateEditor/TemplateEditor';
import { InitContext } from 'global/context/InitContext';
import arrowanswer from 'assets/images/icons/icons-inbox/icon-arrow-answer.svg';
import arrowexit from 'assets/images/icons/icons-inbox/icon-exit.svg';
import styles from './MsgTemplate.css';

export default function Template() {
	const [answer, setAnswer] = useState<string>('');
	const [showLabel, setShowLabel] = useState<boolean>(false);
	const [actualMsg, setActualMsg] = useState<ITQMessage>();
	const [isReplyingModalOpened, setIsReplyingModalOpened] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [showMobileEditor, setShowMobileEditor] = useState(false);
	const [selectedSticker, setSelectedSticker] = useState('');
	const templateQuestion = useRef<HTMLDivElement>(null);
	const templateAnswer = useRef<HTMLDivElement>(null);
	const templateQuestionContainer = useRef<HTMLDivElement>(null);
	const label = useRef<HTMLDivElement>(null);
	const form = useRef<HTMLFormElement>(null);
	const stickerRef = useRef<HTMLDivElement>(null);
	const location = useLocation<ITQMessage>();
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
		const msg = (location.state as any)['actualMsg'] as ITQMessage;
		setActualMsg(msg);
		templateAnswer.current!.focus();
		templateQuestion.current!.innerHTML = `"${msg!.content}"`;
	}, [location, actualMsg]);

	const handleStickerAnimationEnd = useCallback(
		(e: HTMLElementEventMap['animationend']) => {
			const target = e.target as HTMLImageElement;
			target.classList.remove(styles['toggle-sticker-anim']);
		},
		[]
	);

	useEffect(() => {
		const { current: curr } = stickerRef;
		const toggleStickerClass = styles['toggle-sticker-anim'];
		curr?.classList.add(toggleStickerClass);
		curr?.addEventListener('animationend', handleStickerAnimationEnd);
		return () => {
			curr?.removeEventListener('animationend', handleStickerAnimationEnd);
		};
	}, [selectedSticker, handleStickerAnimationEnd]);

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let data = { answer, _id: '' };
		data._id = actualMsg!._id;
		socket.emit('msg:ans', data);
		socket.on('msg:ans', (_data: Object) => {
			console.log(data);
			// if (data.success) {
			// 	//success
			// }
		});
	};

	const toggleLabelHandler = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const targetElement = e.target as HTMLDivElement;
		if (label.current!.classList.contains(styles['question-label-active'])) {
			switch (e.type) {
				case 'mouseenter':
					targetElement.classList.add(styles['remove-label-active']);
					break;
				case 'click':
					label.current!.classList.remove(styles['remove-label-active']);
					break;
			}
		}
	};

	return (
		<div styleName="container" onClick={toggleLabelHandler}>
			<div>
				<div styleName="head-btns">
					<Link to="/messages" styleName="btn-back">
						<img src={arrowexit} alt="arrow" />
					</Link>
					<button
						styleName="btn-share"
						onClick={() => setIsReplyingModalOpened(!isReplyingModalOpened)}
					>
						<img src={arrowanswer} alt="arrow" />
					</button>
				</div>
				<ReplyingModal
					opened={isReplyingModalOpened}
					setOpened={setIsReplyingModalOpened}
					form={form.current as HTMLFormElement}
					templateQuestion={templateQuestionContainer.current as HTMLDivElement}
				/>
				{!isMobile && (
					<div styleName="editor-container">
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
					</div>
				)}
			</div>
			<div
				styleName="question-container"
				ref={templateQuestionContainer}
				className="d-text-select"
			>
				<div>
					<div
						styleName={`question-label ${
							showLabel ? 'question-label-active' : ''
						}`}
						ref={label}
						onMouseEnter={toggleLabelHandler}
					></div>
					<div styleName="remove-label-box" onClick={() => setShowLabel(false)}>
						✕
					</div>
					<div styleName="question" ref={templateQuestion}>
						""
					</div>
					<div styleName="answer" ref={templateAnswer}>
						<div>{parse(answer)}</div>
					</div>
					{selectedSticker !== '' && (
						<div styleName="sticker" ref={stickerRef}>
							<img src={selectedSticker} alt="un etikel" />
						</div>
					)}
				</div>
				{isMobile && (
					<>
						<button
							onClick={() => setShowMobileEditor(true)}
							styleName={`btn-toggle-editor-bar ${
								!showMobileEditor ? 'show' : ''
							}`}
						>
							L
						</button>
						<div
							styleName={`mobile-editor-container ${
								showMobileEditor ? 'show' : ''
							}`}
						>
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
						</div>
					</>
				)}
			</div>
		</div>
	);
}
