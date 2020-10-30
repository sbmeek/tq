import React, { useState } from 'react';
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
	onOverlayMouseDownOrTouch?: (
		eventObject: React.MouseEvent<any> & React.TouchEvent<any>
	) => void;
}

export default function Modal(
	props: React.PropsWithChildren<React.ReactNode> & ModalProps
) {
	const [isActive, setIsActive] = useState(props.isActive);

	const handleOverlayMouseDownOrTouch =
		props.onOverlayMouseDownOrTouch ||
		(() => {
			setIsActive(false);
		});

	return (
		<>
			<Overlay
				{...props.customOverlay?.props}
				customStyles={props.customOverlay?.customStyles}
				isActive={isActive}
				onMouseDown={handleOverlayMouseDownOrTouch}
				onTouchStart={handleOverlayMouseDownOrTouch}
			/>
			<Wrapper
				{...props.customWrapper?.props}
				customStyles={props.customWrapper?.customStyles}
			>
				<Container
					isActive={isActive}
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
