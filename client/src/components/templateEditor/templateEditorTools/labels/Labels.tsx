import React, { MouseEvent } from 'react';
import './Labels.css';

export default function Labels<
	T extends {
		label: HTMLDivElement;
		setShowLabel: Function;
	}
>({ label, setShowLabel }: T) {
	const labelClickHandler = (e: MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement;
		label.innerText = targetElement.innerHTML;
		setShowLabel(true);
		label.style.color = window.getComputedStyle(targetElement).color;
	};

	return (
		<div styleName="labels-container" className="d-text-select">
			<button styleName="label">
				<span role="img" aria-label="seen" onClick={labelClickHandler}>
					✔️
				</span>
			</button>
			<button styleName="label">
				<span role="img" aria-label="heart" onClick={labelClickHandler}>
					❤️
				</span>
			</button>
			<button styleName="label">
				<span role="img" aria-label="star" onClick={labelClickHandler}>
					🌟
				</span>
			</button>
			<button styleName="label">
				<span role="img" aria-label="fire" onClick={labelClickHandler}>
					🔥
				</span>
			</button>
			<button styleName="label">
				<span role="img" aria-label="water-drop" onClick={labelClickHandler}>
					💧
				</span>
			</button>
		</div>
	);
}
