import React, { useContext } from 'react';

import Interweave from 'interweave';
import { SectionPropsType } from 'components/root/Root';
import { Section } from 'components/root/Root.style';

import bg from 'assets/images/presentation/bg2.svg';
import logoSection2 from 'assets/images/presentation/logo_section2.png';

import {
	Bg,
	FirstRow,
	SecondRow,
	Logo,
	InnerWrapper,
	Title,
	Paragraph,
	formCustomStyle
} from './Section2.style';

import MainTextInput from 'components/main-text-input/MainTextInput';
import { InitContext } from 'global/context/InitContext';

function Section2({ inView, inViewRef }: SectionPropsType) {
	const lang = useContext(InitContext).state.lang.Root.Section2;

	return (
		<Section ref={inViewRef} isVisible={inView}>
			<FirstRow>
				<Logo src={logoSection2} alt="logo-section2" />
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

export default React.memo(Section2);
