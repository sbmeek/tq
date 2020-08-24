import React from 'react'
import './BgColors.css'

export default function BgColors<
	T extends {
		templateQuestionContainer: HTMLDivElement
	}
>({ templateQuestionContainer }: T) {

	const bgColorClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        let targetElement = e.target as HTMLDivElement
		templateQuestionContainer.style.background = targetElement.style.backgroundColor
	}

	return (
		<div styleName="bg-colors-container">
			<div styleName="bg-color" style={{ background: "#f0210f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" style={{ background: "#40265f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" style={{ background: "#60224f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" style={{ background: "#10244f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" style={{ background: "#90564f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" style={{ background: "#94124f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" style={{ background: "#91221f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" style={{ background: "#50278f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
			<div styleName="bg-color" style={{ background: "#60257f" }} onClick={bgColorClickHandler}>
				<div></div>
			</div>
		</div>
	)
}
