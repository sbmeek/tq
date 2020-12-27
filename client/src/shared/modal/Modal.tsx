import React from 'react';
import {
	Container,
	InnerContainer,
	IsActiveType,
	CustomType,
	Overlay,
	Wrapper
} from './Modal.style';

interface ModalProps extends IsActiveType {
	customOverlay?: CustomType;
	customWrapper?: CustomType;
	customContainer?: CustomType;
	customInnerContainer?: CustomType;
	customStyle?: CustomStyles;
	onOverlayMouseDownOrTouch?: (
		eventObject: React.MouseEvent<any> & React.TouchEvent<any>
	) => void;
}

export default function Modal(
	props: React.PropsWithChildren<React.ReactNode> & ModalProps
) {
	const handleOverlayMouseDownOrTouch =
		props.onOverlayMouseDownOrTouch ||
		(() => {
			props.isActive = false;
		});

	return (
		<>
			<Overlay
				{...props.customOverlay?.props}
				customStyles={props.customOverlay?.customStyles}
				isActive={props.isActive}
				onMouseDown={handleOverlayMouseDownOrTouch}
				onTouchStart={handleOverlayMouseDownOrTouch}
				id="overlay"
			/>
			<Wrapper
				{...props.customWrapper?.props}
				customStyles={props.customWrapper?.customStyles}
			>
				<Container
					isActive={props.isActive}
					{...props.customContainer?.props}
					customStyles={props.customContainer?.customStyles}
				>
					<InnerContainer
						{...props.customInnerContainer?.props}
						customStyles={props.customInnerContainer?.customStyles}
					>
						{props.children}
					</InnerContainer>
				</Container>
			</Wrapper>
		</>
	);
}
