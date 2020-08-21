import React, { MouseEvent, useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import './ReplyingModal.css'

export default function Answer<
	T extends {
		opened: boolean
		setOpened: Function
		form: HTMLFormElement
		templateQuestion: HTMLDivElement
	}
>({ opened, setOpened, form, templateQuestion }: T) {
    const [templateImg, setTemplateImg] = useState('')
    const [showShareOrSaveModal, setShowShareOrSaveModal] = useState(false);
	const ansImg = useRef<HTMLImageElement>(null)

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
	}

	const handleAnswerClick = () => {
        form.dispatchEvent(new Event('submit', { cancelable: true }))
        setShowShareOrSaveModal(true);
	}

	const convertTemplate = async () => {
		if (templateQuestion === null) return
		const cnv = await html2canvas(templateQuestion)
		const img = cnv.toDataURL('image/png')
		if (process.env.NODE_ENV === 'development') console.log(img)
		setTemplateImg(img)
		ansImg.current!.src = img
		templateQuestion.style.borderRadius = '20px'
	}

	const openImage = async () => {
		templateQuestion.style.borderRadius = '0'
		await convertTemplate()
		const w = window.open() as Window
		w.document.body.setAttribute(
			'style',
			'min-width:100vw;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;margin:0;padding:0;'
		)
		w.document.body.innerHTML = `<h1>temp img - TQ</h1>${
			ansImg.current!.outerHTML
		}`
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
                {
                    !showShareOrSaveModal 
                    ? 
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
                    : <ShareOrSaveModal 
                        showShareOrSaveModal={showShareOrSaveModal} 
                        openImage={openImage}
                    />
                }
			</div>
		</div>
	)
}

function ShareOrSaveModal<
	T extends {
		showShareOrSaveModal: boolean;
        openImage: () => Promise<void>
	}
>({ showShareOrSaveModal, openImage }: T) {
	return (
		<div styleName={`share-save-modal ${showShareOrSaveModal ? 'active' : ''}`}>
            <h2>Haz respondido! :D</h2>
			<button styleName="_btn" onClick={() => openImage()}>img</button>
		</div>
	)
}
