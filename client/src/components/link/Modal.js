import React from 'react'
import Interweave from 'interweave'
import './Modal.css'

export default function Modal({ modalTxt, showModal, setShowModal }) {
	const modalStyle = {
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
