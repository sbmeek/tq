import React from 'react';
import { Bgcolorscontainer, Bgcolor } from './BgColors.style';

export default function BgColors<
	T extends {
		templateQuestionContainer: HTMLDivElement;
	}
>({ templateQuestionContainer }: T) {
	const bgColorClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		let targetElement = e.target as HTMLDivElement;
		templateQuestionContainer.style.background =
			targetElement.style.backgroundColor;
	};

	return (
		<Bgcolorscontainer>
			<Bgcolor style={{ background: '#f0210f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#40265f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#60224f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#10244f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#90564f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#94124f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#91221f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#50278f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#60257f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#00812b' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#0ed14f' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
			<Bgcolor style={{ background: '#5eff00' }} onClick={bgColorClickHandler}>
				<div></div>
			</Bgcolor>
		</Bgcolorscontainer>
	);
}
