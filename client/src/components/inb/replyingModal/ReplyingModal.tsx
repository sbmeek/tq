import React, { MouseEvent, useState, useRef } from 'react'
import './ReplyingModal.css'
import { useHistory } from 'react-router'
import html2canvas from 'html2canvas'

export default function Answer<
	T extends {
		opened: boolean
		setOpened: Function
		form: HTMLFormElement
		templateQuestion: HTMLDivElement
	}
>({ opened, setOpened, form, templateQuestion }: T) {
    const [templateImg, setTemplateImg] = useState('')
    const ansImg = useRef<HTMLImageElement>(null)
    const history = useHistory();

    const convertTemplate = async () => {
        if (templateQuestion === null) return;
        templateQuestion.style.borderRadius = '0';
		const cnv = await html2canvas(templateQuestion)
		const img = cnv.toDataURL('image/png')
		if (process.env.NODE_ENV === 'development') console.log(img)
		setTemplateImg(img)
		ansImg.current!.src = img
        templateQuestion.style.borderRadius = '20px'
        return img;
	}

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
	}

	const handleAnswerClick = async () => {
        form.dispatchEvent(new Event('submit', { cancelable: true }))
        const img = await convertTemplate();
        localStorage.setItem('imgdata', (img as string));
        history.push({
            pathname: '/messages',
            state: { showShareOrSaveModal: true }
        });
	}

	return (
		<div>
            <img
				src={templateImg}
				ref={ansImg}
				styleName="ans-img"
				alt="template-answer"
			/>
			<div
				onClick={handleOverlayClick}
				styleName={`overlay ${opened ? 'active' : ''}`}
				id="overlay"
			>
                <div styleName="confirm-container">
                    <h2>Are you sure you want to send this message?</h2>
                    <div styleName="btns-container">
                        <button
                            styleName="modal-confirm-btn btn-cancel"
                            onClick={() => setOpened(!opened)}
                        >
                            <span styleName="btn-primary-txt">Cancel</span>
                            <span styleName="hover-txt">X</span>
                        </button>
                        <button
                            styleName="modal-confirm-btn btn-answer"
                            onClick={handleAnswerClick}
                        >
                            <span styleName="btn-primary-txt">Answer</span>
                            <span styleName="hover-txt">{'>'}</span>
                        </button>
                    </div>
                    <small styleName="confirm-note">
                        Note: If this message is replied, it cannot be edited.
                    </small>
                </div>
			</div>
		</div>
	)
}