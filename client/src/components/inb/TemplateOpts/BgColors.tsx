import React from 'react'
import styles from './BgColors.css'

export default function BgColors<
	T extends {
		templateQuestionContainer: HTMLDivElement
	}
>({ templateQuestionContainer }: T) {
	const bgColorClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		let targetElement = e.target as HTMLDivElement
		if (targetElement.classList.contains(styles['bg-color']))
            targetElement = targetElement.children[0] as HTMLDivElement
		templateQuestionContainer.style.background = window.getComputedStyle(targetElement).background
	}

	return (
		<div styleName="bg-colors-container">
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div></div>
			</div>
		</div>
	)
}
