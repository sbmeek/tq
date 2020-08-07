import React from 'react'
import './BgColors.css'

export default function BgColors({ templateQuestionContainer }) {

	const bgColorClickHandler = (e) => {
		templateQuestionContainer.style.background = e.target.id;
		console.log(templateQuestionContainer);
	}

	return (
		<div styleName="bg-colors-container">
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#f0210f"></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#40265f"></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#60224f"></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#10244f"></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#90564f"></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#94124f"></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#91221f"></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#50278f"></div>
			</div>
			<div styleName="bg-color" onClick={bgColorClickHandler}>
				<div id="#60257f"></div>
			</div>
		</div>
	)
}
