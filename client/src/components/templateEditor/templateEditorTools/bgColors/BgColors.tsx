import React from 'react';
import {
	Bgcolorscontainer,
	Bgcolor,
	Bgcolor1,
	Bgcolor2,
	Bgcolor3,
	Bgcolor4,
	Bgcolor5,
	Bgcolor6,
	Bgcolor7,
	Bgcolor8,
	Bgcolor9,
	Bgcolor10,
	Bgcolor11,
	Bgcolor12
} from './BgColors.style';

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
			<Bgcolor1 onClick={bgColorClickHandler} style={{background: "#f0210f"}}></Bgcolor1>
			<Bgcolor2 onClick={bgColorClickHandler} style={{background: "#40265f"}}></Bgcolor2>
			<Bgcolor onClick={bgColorClickHandler} style={{background: "#60224f"}}></Bgcolor>
			<Bgcolor3 onClick={bgColorClickHandler} style={{background: "#90564f"}}></Bgcolor3>
			<Bgcolor4 onClick={bgColorClickHandler} style={{background: " #94124f"}}></Bgcolor4>
			<Bgcolor5 onClick={bgColorClickHandler} style={{background: "#91221f"}}></Bgcolor5>
			<Bgcolor6 onClick={bgColorClickHandler}style={{background: "#50278f"}}></Bgcolor6>
			<Bgcolor7 onClick={bgColorClickHandler}style={{background: "#60257f"}}></Bgcolor7>
			<Bgcolor8 onClick={bgColorClickHandler}style={{background: "#00812b"}}></Bgcolor8>
			<Bgcolor9 onClick={bgColorClickHandler}style={{background: "#0ed14f"}}></Bgcolor9>
			<Bgcolor10 onClick={bgColorClickHandler}style={{background: "#5eff00"}}></Bgcolor10>
			<Bgcolor11 onClick={bgColorClickHandler}style={{background: "#10244f;"}}></Bgcolor11>
			<Bgcolor12 onClick={bgColorClickHandler}style={{background: "#60224f"}}></Bgcolor12>
		</Bgcolorscontainer>
	);
}
