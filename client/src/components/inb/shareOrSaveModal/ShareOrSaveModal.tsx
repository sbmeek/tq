import React, { useState, useEffect, MouseEvent } from 'react'
import './ShareOrSaveModal.css'
import { useHistory } from 'react-router'

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
				<h2>Haz respondido! :D</h2>
				<button styleName="_btn" onClick={() => openImage!()}>
					img
				</button>
			</div>
		</div>
	)
}
