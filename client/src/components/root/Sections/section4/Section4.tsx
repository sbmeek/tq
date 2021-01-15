import React, { useContext } from 'react';
import { SectionPropsType } from 'components/root/Root';
import { InitContext } from 'global/context/InitContext';
import { Section } from 'components/root/Root.style';
import bg4 from 'assets/images/presentation/bg4.svg';
import logoMaxSection4 from 'assets/images/presentation/logo_max_section4.png';
import logoMinSection4 from 'assets/images/presentation/logo_min_section4.png';
import logoReMinSection4 from 'assets/images/presentation/logo_remin_section4.png';
import {
	Bg4,
	FirstRowSection4,
	LogoImgSection4,
	LogoPicSection4,
	ParagraphSection4,
	SecondRowSection4,
	TextWrapperSection4,
	TitleSection4
} from './Section4.style';
import Interweave from 'interweave';

function Section4({ inView, inViewRef }: SectionPropsType) {
	const lang = useContext(InitContext).state.lang.Root.Section4;
	return (
		<Section ref={inViewRef} isVisible={inView}>
			<FirstRowSection4>
				<LogoPicSection4>
					<source media="(max-width: 390px)" srcSet={logoReMinSection4} />
					<source media="(max-width: 501px)" srcSet={logoMinSection4} />
					<LogoImgSection4 src={logoMaxSection4} alt="logo-section4" />
				</LogoPicSection4>
			</FirstRowSection4>
			<SecondRowSection4>
				<Bg4 src={bg4} alt="bg4" />
				<TextWrapperSection4>
					<TitleSection4>{lang['Title']}</TitleSection4>
					<ParagraphSection4>
						<Interweave allowAttributes content={lang['Paragraph']} />
					</ParagraphSection4>
				</TextWrapperSection4>
			</SecondRowSection4>
		</Section>
	);
}

export default React.memo(Section4);
