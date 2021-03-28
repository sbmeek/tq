import React, { useContext } from 'react';
import { useInView } from 'react-intersection-observer';

import { Section } from 'components/root/Root.style';

import Interweave from 'interweave';
import { InitContext } from 'global/context/InitContext';

import logoMaxGeneral from 'assets/images/presentation/logo_max_general.png';
import logoMinGeneral from 'assets/images/presentation/logo_min_general.png';
import sim from 'assets/images/presentation/sim.svg';
import bg from 'assets/images/presentation/bg1.svg';

import {
	ButtonFlyContainer,
	InnerWrapper,
	Title,
	Paragraph,
	FirstRow,
	LogoMax,
	LogoMin,
	Bg,
	SecondRow,
	formCustomStyle
} from './Section1.style';

import MainTextInput from 'components/main-text-input/MainTextInput';
import { inViewOptions } from 'components/root/Root';

function Section1<
	T extends {
		handleAuthClick: () => void;
	}
>({ handleAuthClick }: T) {
	const lang = useContext(InitContext).state.lang.Root.Section1;
	const { ref, inView } = useInView(inViewOptions);

	return (
		<Section ref={ref} isVisible={inView} data-cy="root-section1">
			<FirstRow>
				<ButtonFlyContainer>
					<button onClick={handleAuthClick} data-cy="btn-login">
						{lang['BtnLogin']} <img src={sim} alt="sim" />
					</button>
				</ButtonFlyContainer>
				<LogoMax src={logoMaxGeneral} alt="logo-section1" />
				<LogoMin src={logoMinGeneral} alt="logo-section1" />
			</FirstRow>
			<SecondRow>
				<Bg src={bg} alt="bg" />
				<InnerWrapper>
					<Title>{lang['Title']}</Title>
					<Paragraph>
						<Interweave allowAttributes={true} content={lang['Paragraph']} />
					</Paragraph>
					<MainTextInput formCustomStyle={formCustomStyle} />
				</InnerWrapper>
			</SecondRow>
		</Section>
	);
}

export default React.memo(Section1);
