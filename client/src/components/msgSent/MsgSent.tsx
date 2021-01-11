import React from 'react';
import logo from 'assets/images/msg/logo2.png';
import homeIcon from 'assets/images/icons/home.svg';

import {
	btnCustomStyle,
	Container,
	H3,
	LinkHome,
	LinkSendAgain,
	Logo,
	LogoContainer,
	TextWrapper,
	Wrapper
} from './MsgSent.style';
import Button from 'shared/button/Button';

export function MsgSent<
	T extends { setSent: React.Dispatch<React.SetStateAction<boolean>> }
>({ setSent }: T) {
	return (
		<Container>
			<Wrapper>
				<LogoContainer>
					<Logo src={logo} alt="logo" />
				</LogoContainer>
				<TextWrapper>
					<H3>Gracias por mandar tu mensaje.</H3>
					<LinkSendAgain onClick={() => setSent(false)}>
						Enviar otro mensaje
					</LinkSendAgain>
				</TextWrapper>
			</Wrapper>
			<LinkHome to="/">
				<Button group="primary" hoverMode="color" customStyle={btnCustomStyle}>
					Inicio
					<img src={homeIcon} alt="home icon" />
				</Button>
			</LinkHome>
		</Container>
	);
}

export default MsgSent;
