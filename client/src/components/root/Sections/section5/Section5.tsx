import React, { useContext } from 'react';

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

function Section5<
	T extends {
		inView: boolean | undefined;
		inViewRef:
			| React.RefObject<any>
			| ((node?: Element | null | undefined) => void);
	}
>({ inViewRef, inView }: T) {
	const lang = useContext(InitContext).state.lang.Root.Section5;

	return (
		<Section ref={inViewRef} isVisible={inView} data-cy="root-section5">
			<LogoPic>
				<source media="(max-width: 515px)" srcSet={logoMinGeneral} />
				<LogoImg src={logoMaxGeneral} alt="logo-section5" />
			</LogoPic>
			<InnerContainer>
				<Bg src={bg} alt="bg" />
				<Wrapper>
					<Title>{lang['Title']}</Title>
					<MainTextInput formCustomStyle={formCustomStyle} />
				</Wrapper>
			</InnerContainer>
		</Section>
	);
}

export default React.memo(Section5);
