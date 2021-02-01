import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import html2canvas from 'html2canvas';
import arrowIcon from 'assets/images/icons/icons-inbox/icon-arrow-answer.svg';
import xIcon from 'assets/images/icons/share-icons/icon-x.svg';
import { InitContext } from 'global/context/InitContext';
import Modal from 'shared/modal/Modal';
import {
	AnswerImg,
	btnCustomStyle,
	BtnsWrapper,
	customContainerStyle,
	customInnerContainerStyle,
	Note,
	Title
} from './ReplyingModal.style';
import Button from 'shared/button/Button';

export default function Answer<
	T extends {
		opened: boolean;
		setOpened: Function;
		form: HTMLFormElement;
		templateQuestion: HTMLDivElement;
	}
>({ opened, setOpened, form, templateQuestion }: T) {
	const lang = useContext(InitContext).state.lang.Inbox;
	const [templateImg, setTemplateImg] = useState('');
	const ansImg = useRef<HTMLImageElement>(null);
	const history = useHistory();

	const convertTemplate = async () => {
		if (templateQuestion === null) return;
		templateQuestion.style.borderRadius = '0';
		const cnv = await html2canvas(templateQuestion);
		const img = cnv.toDataURL('image/png');
		if (process.env.NODE_ENV === 'development') console.log(img);
		setTemplateImg(img);
		ansImg.current!.src = img;
		templateQuestion.style.borderRadius = '20px';
		return img;
	};

	const handleOverlayClick = () => {
		setOpened(!opened);
	};

	const handleAnswerClick = async () => {
		form.dispatchEvent(new Event('submit', { cancelable: true }));
		const img = await convertTemplate();
		localStorage.setItem('imgdata', img as string);
		history.replace({
			pathname: '/messages',
			state: {
				showShareOrSaveModal: true,
				actualMsg: undefined
			}
		});
	};

	return (
		<>
			<AnswerImg src={templateImg} ref={ansImg} alt="template-answer" />
			<Modal
				customContainer={{ customStyles: customContainerStyle }}
				customInnerContainer={{ customStyles: customInnerContainerStyle }}
				onOverlayMouseDownOrTouch={handleOverlayClick}
				isActive={opened}
			>
				<Title>{lang['TitleRep']}</Title>
				<BtnsWrapper>
					<Button
						group="primary"
						hoverMode="translate"
						onClick={() => setOpened(!opened)}
						customStyle={btnCustomStyle}
					>
						<span>{lang['BtnCancel']}</span>
						<img src={xIcon} alt="x" />
					</Button>
					<Button
						group="secondary"
						hoverMode="translate"
						onClick={handleAnswerClick}
						customStyle={btnCustomStyle}
					>
						<span>{lang['BtnAnswer']}</span>
						<img src={arrowIcon} alt="arrow" />
					</Button>
				</BtnsWrapper>
				<Note>{lang['Note']}</Note>
			</Modal>
		</>
	);
}
