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

export const MsgSent = () => {
	return (
		<Container>
			<Wrapper>
				<LogoContainer>
					<Logo src={logo} alt="logo" />
				</LogoContainer>
				<TextWrapper>
					<H3>Gracias por mandar tu mensaje.</H3>
					<LinkSendAgain to="/">Enviar otro mensaje</LinkSendAgain>
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
};

export default MsgSent;
