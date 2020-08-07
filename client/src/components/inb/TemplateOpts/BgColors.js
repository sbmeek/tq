import React from 'react'
import styles from './BgColors.css'

export default function BgColors({ templateQuestionContainer }) {

	const bgColorClickHandler = (e) => {
		if(e.target.classList.contains(styles['bg-color'])) e.target = e.target.children[0];
		templateQuestionContainer.style.background = window.getComputedStyle(e.target).background;
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
