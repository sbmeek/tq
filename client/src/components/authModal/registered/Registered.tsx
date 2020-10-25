import React, { useContext } from 'react';
import { InitContext } from 'global/context/InitContext';
import arrow from 'assets/images/left-arrow.svg';
import tqLogo from 'assets/images/ltqrNEW.png';
import { Toggler } from '../AuthModal.style';

import {
	ArrowIcon,
	Container,
	InnerWrapper,
	Logo,
	Paragraph,
	Title,
	Wrapper
} from './Registered.style';

export default function Registered<
	T extends {
		setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
		setShowRegisteredComp: React.Dispatch<React.SetStateAction<boolean>>;
	}
>({ setShowLogin, setShowRegisteredComp }: T) {
	const { Signedup: lang } = useContext(
		InitContext
	).state.lang.AuthModal.Signup;

	const handleClick = () => {
		setShowLogin(true);
		setShowRegisteredComp(false);
	};

	return (
		<Container>
			<Logo src={tqLogo} alt="tq logo" />
			<Wrapper>
				<Title>{lang['title']}</Title>
				<Paragraph>{lang['helpText']}</Paragraph>
				<InnerWrapper onClick={handleClick}>
					<Toggler>{lang['logInBtn']}</Toggler>
					<ArrowIcon src={arrow} alt="arrow" />
				</InnerWrapper>
			</Wrapper>
		</Container>
	);
}
