import { InitContext } from 'global/context/InitContext';
import React, { MouseEvent, useContext } from 'react';
import { Container, Label } from './Labels.style';

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
	const lang = useContext(InitContext).state.lang.TemplateEditor;

	return (
		<Container className="d-text-select">
			<div>
				<h1>{lang['Label']}</h1>
			</div>
			<Label>
				<span role="img" aria-label="seen" onClick={labelClickHandler}>
					✔️
				</span>
			</Label>
			<Label>
				<span role="img" aria-label="heart" onClick={labelClickHandler}>
					❤️
				</span>
			</Label>
			<Label>
				<span role="img" aria-label="star" onClick={labelClickHandler}>
					🌟
				</span>
			</Label>
			<Label>
				<span role="img" aria-label="fire" onClick={labelClickHandler}>
					🔥
				</span>
			</Label>
			<Label>
				<span role="img" aria-label="water-drop" onClick={labelClickHandler}>
					💧
				</span>
			</Label>
		</Container>
	);
}
