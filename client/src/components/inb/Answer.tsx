import React, { MouseEvent } from 'react'
import './Answer.css'

export default function Answer<
	T extends {
		opened: boolean
		setOpened: Function
		form: HTMLFormElement
	}
>({ opened, setOpened, form }: T) {

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
    }
    
    const handleEClick = () => {
        form.dispatchEvent(new Event('submit', { cancelable: true }))
    }

	return (
		<div>
			<div
				id="overlay"
				onClick={handleOverlayClick}
				styleName="overlay"
				style={{
					transform: `translateX(${opened ? '0%' : '-100%'})`,
				}}
			>
				<div styleName="container">
					<button styleName="x_btn" onClick={() => setOpened(!opened)}>
						X
					</button>
					<button styleName="_btn" type="submit" onClick={handleEClick}>
						e
					</button>
				</div>
			</div>
		</div>
	)
}
