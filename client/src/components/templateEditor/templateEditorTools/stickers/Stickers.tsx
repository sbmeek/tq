import React, { useRef } from 'react';

import stAjaam from 'assets/images/template-editor/stickers/st-ajaam.png';
import stBesho from 'assets/images/template-editor/stickers/st-besho.png';
import stCatExitado from 'assets/images/template-editor/stickers/st-cat-exitado.png';
import stCatSorprendido from 'assets/images/template-editor/stickers/st-cat-sorprendido.png';
import stHipolito from 'assets/images/template-editor/stickers/st-hipolito.png';
import stTodoBien from 'assets/images/template-editor/stickers/st-todo-bien.png';
import stWisqui from 'assets/images/template-editor/stickers/st-wisqui.png';
import stYete from 'assets/images/template-editor/stickers/st-y-ete.png';

import './Stickers.css';

export default function Stickers<
	T extends {
		setSelectedSticker: React.Dispatch<React.SetStateAction<string>>;
	}
>({ setSelectedSticker }: T) {
	const stickersArr = useRef([
		stAjaam,
		stBesho,
		stCatExitado,
		stCatSorprendido,
		stHipolito,
		stTodoBien,
		stWisqui,
		stYete
	]);

	const handleStickerClick = (e: React.MouseEvent) => {
		const { src } = e.target as HTMLImageElement;
		setSelectedSticker(src);
	};

	return (
		<div styleName="container">
			{stickersArr.current.map((st, idx) => (
				<div
					styleName="sticker-container"
					onMouseDown={handleStickerClick}
					key={idx}
				>
					<img src={st} alt="un etikel" />
				</div>
			))}
		</div>
	);
}
