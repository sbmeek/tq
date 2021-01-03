import React, { useState, useEffect, MouseEvent } from 'react';

import { useHistory } from 'react-router';
import whatsapp from 'assets/images/icons/share-icons/whatsapp.svg';
import facebook from 'assets/images/icons/share-icons/facebook.svg';
import instagram from 'assets/images/icons/share-icons/instagram.svg';
import youtube from 'assets/images/icons/share-icons/youtube.svg';
import share from 'assets/images/icons/share-icons/share.svg';
import other from 'assets/images/icons/share-icons/other.svg';
import descargar from 'assets/images/icons/share-icons/descargar.svg';
import Modal from 'shared/modal/Modal';
import{modalcustom } from '../authModal/style'



import {
	Overlay,
	Titulo,
	Share,
	ButtonShare,
	Btn
} from './ShareOrSaveModal.style';

export default function ShareOrSaveModal<
	T extends {
		showShareOrSaveModal: boolean;
		setShowShareOrSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
	}
>({ showShareOrSaveModal, setShowShareOrSaveModal }: T) {
	const [imgdata, setImgdata] = useState('');
	const history = useHistory();

	useEffect(() => {
		setImgdata(localStorage.getItem('imgdata') as string);
	}, []);

	const openImage = async () => {
		const w = window.open() as Window;
		w.document.body.setAttribute(
			'style',
			'min-width:100vw;min-height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;margin:0;padding:0;'
		);
		w.document.body.innerHTML = `<h1>temp img - TQ</h1>
        <img src="${imgdata}" />`;
	};

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		if ((e.target as HTMLDivElement).id !== 'overlay') return;

		setShowShareOrSaveModal(false);
		history.push('/messages', {
			showShareOrSaveModal: false
		});
	};
	const handleBtnCancelClick = () => {
		setShowShareOrSaveModal(false);
	};
	return (
		<Overlay onClick={handleOverlayClick} id="overlay">
			<Modal 	isActive={true} customStyle={modalcustom} >
				<Titulo>share or save the image.</Titulo>
				<Share>
					<ButtonShare style={{background: "#00B800"}}>
						<img src={whatsapp} alt="share" />
						<img src={share} alt="on-share" />
					</ButtonShare>
					<ButtonShare style={{background: "#0A5AA1"}}>
						<img src={facebook} alt="share" />
						<img src={share} alt="on-share" />
					</ButtonShare>
					<ButtonShare style={{background: " transparent linear-gradient(247deg, #7D05AF 0%, #D91799 26%, #FC277C 53%, #FC8B09 85%, #FFCB7E 100%) 0% 0% no-repeat padding-box"}}>
						<img src={instagram} alt="share" />
						<img src={share} alt="on-share" />
					</ButtonShare>
					<ButtonShare style={{background: "#DF0E0E"}}>
						<img src={youtube} alt="share" />
						<img src={share} alt="on-share" />
					</ButtonShare>
				</Share>
				<Btn>
					<h3>Other...</h3>
					<img src={other} alt="on-other" />
					<img src={other} alt="on-other" />
				</Btn>
				<Btn onClick={() => openImage!()}>
					<h3>save</h3>
					<img src={descargar} alt="on-save" />
				</Btn>
				<Btn  onMouseDown={handleBtnCancelClick}>
					<span>close</span>
					<span>X</span>
				</Btn>
			</Modal>
		</Overlay>
	);
}
