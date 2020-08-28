import React from 'react'
import './RegisterModal.css'

export default function RegisterModal<
	T extends {
		opened: boolean
		setOpened: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ opened, setOpened }: T) {
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
	}

	return (
		<div>
			<div
				onClick={handleOverlayClick}
				styleName={`overlay ${opened ? 'active' : ''}`}
				id="overlay"
			>
				<div styleName="container">
					<h2>la vaina</h2>
				</div>
			</div>
		</div>
	)
}
