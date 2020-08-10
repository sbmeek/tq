import React, { CSSProperties } from 'react'
import Interweave from 'interweave'
import './Modal.css'

interface IProps {
	modalTxt: string;
	showModal: boolean;
	setShowModal: Function;
}

export default function Modal({ modalTxt, showModal, setShowModal }: IProps) {

	const modalStyle: CSSProperties = {
		visibility: showModal ? 'visible' : 'hidden',
		opacity: showModal ? '1' : '0',
		transition: 'all 200ms',
	}

	return (
		<div style={modalStyle}>
			<div styleName="overlay" onClick={() => setShowModal(false)}></div>
			<div styleName="modal-container">
				<Interweave allowAttributes={true} content={modalTxt} />
				<button styleName="btn-close-modal" onClick={() => setShowModal(false)}>
					X
				</button>
			</div>
		</div>
	)
}
