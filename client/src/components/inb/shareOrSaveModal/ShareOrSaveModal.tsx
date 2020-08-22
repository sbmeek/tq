import React, { useState, useEffect, MouseEvent } from 'react'
import './ShareOrSaveModal.css'
import { useHistory } from 'react-router'
import whatsapp from 'assets/images/share-icons/whatsapp.svg'
import facebook from 'assets/images/share-icons/facebook.svg'
import instagram from 'assets/images/share-icons/instagram.svg'
import youtube from 'assets/images/share-icons/youtube.svg'
import share from 'assets/images/share-icons/share.svg'
import other from 'assets/images/share-icons/other.svg'
import descargar from 'assets/images/share-icons/descargar.svg'

export default function ShareOrSaveModal<
	T extends {
        showShareOrSaveModal: boolean
        setShowShareOrSaveModal: React.Dispatch<React.SetStateAction<boolean>>   
	}
>({ showShareOrSaveModal, setShowShareOrSaveModal }: T) {
	const [imgdata, setImgdata] = useState('')
    const history = useHistory();

	useEffect(() => {
		setImgdata(localStorage.getItem('imgdata') as string)
	}, [])

	const openImage = async () => {
		const w = window.open() as Window
		w.document.body.setAttribute(
			'style',
			'min-width:100vw;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;margin:0;padding:0;'
		)
		w.document.body.innerHTML = `<h1>temp img - TQ</h1>
        <img src="${imgdata}" />`
    }
    
    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if((e.target as HTMLDivElement).id !== 'overlay') return;
        
        setShowShareOrSaveModal(false);
        history.push('/messages', {
            showShareOrSaveModal: false
        });
    }

	return (
        <div 
            styleName="overlay"
            onClick={handleOverlayClick}
            id="overlay"
        >
			<div
				styleName={`share-save-modal ${showShareOrSaveModal ? 'active' : ''}`}
			>
				<h1>share or save the image.</h1>
				<div styleName="share">
					<button styleName="whatsapp">
						<img src={whatsapp} alt="share"/>
						<img src={share} styleName="hover-share" alt="on-share"/>

					</button>
					<button styleName="facebook">
						<img src={facebook}  alt="share" />
						<img src={share} styleName="hover-share" alt="on-share"/>
					</button>
					<button styleName="instagram">
						<img src={instagram} alt="share"/>
						<img src={share} styleName="hover-share" alt="on-share"/>
					</button>
					<button styleName="youtube">
						<img src={youtube} alt="share"/>
						<img src={share} styleName="hover-share" alt="on-share"/>
					</button>
				</div>
				<button styleName="_btn" > 
				<h3>Other...</h3>
				<img src={other} alt="on-other" />
				<img src={other} alt="on-other" />
				</button>
				<button styleName="_btn" onClick={() => openImage!()}>
					<h3>save</h3>
					<img src={descargar} alt="on-save"/>
				</button>
				<button styleName="close">
					<span>close</span>
					<span>X</span>
					</button>
			</div>
		</div>
	)
}
