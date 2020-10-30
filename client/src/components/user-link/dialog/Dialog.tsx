import React from 'react';
import Interweave from 'interweave';
import { BtnCloseDialog, DialogContainer, DialogWrapper } from './Dialog.style';
import { Overlay } from 'shared/modal/Modal.style';

export default function HelpDialog<
	T extends {
		modalTxt: string;
		showModal: boolean;
		setShowModal: Function;
	}
>({ modalTxt, showModal, setShowModal }: T) {
	return (
		<DialogContainer showModal={showModal}>
			<Overlay isActive onClick={() => setShowModal(false)} />
			<DialogWrapper>
				<Interweave allowAttributes={true} content={modalTxt} />
				<BtnCloseDialog onClick={() => setShowModal(false)}>X</BtnCloseDialog>
			</DialogWrapper>
		</DialogContainer>
	);
}
