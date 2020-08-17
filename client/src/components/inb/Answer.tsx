import React, { MouseEvent, useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import './Answer.css'

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

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
	}

	const handleEClick = () => {
		form.dispatchEvent(new Event('submit', { cancelable: true }))
	}

	useEffect(() => {
		ansImg.current!.src = templateImg;
	}, [templateImg])

	const convertTemplate = async () => {
		if (templateQuestion === null) return
		const cnv = await html2canvas(templateQuestion)
		const img = cnv.toDataURL('image/png')
		if (process.env.NODE_ENV === 'development') console.log(img)
		setTemplateImg(img)
	}

	const openImage = async () => {
		await convertTemplate();
		const w = window.open() as Window;
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
			<div
				onClick={handleOverlayClick}
				styleName={`overlay ${opened ? 'active' : ''}`}
				id="overlay"
			>
				<div styleName="container">
					<img
						src={templateImg}
						ref={ansImg}
                        styleName="ans-img"
                        alt="template-answer"
					/>
					<button styleName="x_btn" onClick={() => setOpened(!opened)}>
						X
					</button>
					<button styleName="_btn" onClick={handleEClick}>
						env
					</button>
					<button styleName="_btn" onClick={openImage}>
						img
					</button>
				</div>
			</div>
		</div>
	)
}
