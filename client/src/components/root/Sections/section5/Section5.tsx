import React, { useContext, useState } from 'react';

import { SectionPropsType } from 'components/root/Root';
import { InitContext } from 'global/context/InitContext';
import MainTextInput from 'components/main-text-input/MainTextInput';

import logoMaxGeneral from 'assets/images/presentation/logo_max_general.png';
import logoMinGeneral from 'assets/images/presentation/logo_min_general.png';
import bg from 'assets/images/presentation/bg5.svg';

import { Section } from 'components/root/Root.style';
import {
	LogoPic,
	LogoImg,
	InnerContainer,
	Bg,
	Wrapper,
	Title,
	formCustomStyle
} from './Section5.style';

export default function Section5({ inViewRef, inView }: SectionPropsType) {
	const [username, setUsername] = useState('');
	const lang = useContext(InitContext).state.lang.Root.Section5;

	return (
		<Section ref={inViewRef} isVisible={inView}>
			<LogoPic>
				<source media="(max-width: 515px)" srcSet={logoMinGeneral} />
				<LogoImg src={logoMaxGeneral} alt="logo-section5" />
			</LogoPic>
			<InnerContainer>
				<Bg src={bg} alt="bg" />
				<Wrapper>
					<Title>{lang['Title']}</Title>
					<MainTextInput
						formCustomStyle={formCustomStyle}
						username={username}
						setUsername={setUsername}
					/>
				</Wrapper>
			</InnerContainer>
		</Section>
	);
}
