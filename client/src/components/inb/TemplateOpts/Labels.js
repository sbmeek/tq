import React from 'react'
import './Labels.css'

export default function Labels({ label, setShowLabel }) {

	const labelClickHandler = (e) => {
		label.innerHTML = e.target.innerHTML;
		setShowLabel(true);
		label.style.color = window.getComputedStyle(e.target).color;
	}

	return (
		<div styleName="labels-container" className="d-text-select">
			<div styleName="label">
				<span role="img" aria-label="seen" onClick={labelClickHandler}>
					✔️
				</span>
			</div>
			<div styleName="label">
				<span role="img" aria-label="heart" onClick={labelClickHandler}>
					❤️
				</span>
			</div>
			<div styleName="label">
				<span role="img" aria-label="star" onClick={labelClickHandler}>
					🌟
				</span>
			</div>
			<div styleName="label">
				<span role="img" aria-label="fire" onClick={labelClickHandler}>
					🔥
				</span>
			</div>
			<div styleName="label">
				<span role="img" aria-label="water-drop" onClick={labelClickHandler}>
					💧
				</span>
			</div>
		</div>
	)
}
