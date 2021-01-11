import React, { useContext } from 'react';
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
import {InitContext} from 'global/context/InitContext';

export function MsgSent<
	T extends { setSent: React.Dispatch<React.SetStateAction<boolean>> }
>({ setSent }: T) {
	const lang = useContext(InitContext).state.lang.MsgSent;
	return (
		<Container>
			<Wrapper>
				<LogoContainer>
					<Logo src={logo} alt="logo" />
				</LogoContainer>
				<TextWrapper>
					<H3>{lang['Thanks']}</H3>
					<LinkSendAgain onClick={() => setSent(false)}>
						{lang['Again']}
					</LinkSendAgain>
				</TextWrapper>
			</Wrapper>
			<LinkHome to="/">
				<Button group="primary" hoverMode="color" customStyle={btnCustomStyle}>
					{lang['Home']}
					<img src={homeIcon} alt="home icon" />
				</Button>
			</LinkHome>
		</Container>
	);
}

export default MsgSent;
