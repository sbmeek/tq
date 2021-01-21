import React, { useContext } from 'react';
import { Section } from 'components/root/Root.style';
import { InitContext } from 'global/context/InitContext';
import logoMaxSection3 from 'assets/images/presentation/logo_max_section3.png';
import logoMinSection3 from 'assets/images/presentation/logo_min_section3.png';
import bg3 from 'assets/images/presentation/bg3.svg';
import {
	Bg3,
	FirstRowSection3,
	LogoMaxSection3,
	LogoMinSection3,
	ParagraphSection3,
	SecondRowSection3,
	TextWrapperSection3,
	TitleSection3
} from './Section3.style';
import Interweave from 'interweave';
import { useInView } from 'react-intersection-observer';
import { inViewOptions } from 'components/root/Root';

function Section3() {
	const lang = useContext(InitContext).state.lang.Root.Section3;
	const { ref, inView } = useInView(inViewOptions);

	return (
		<Section ref={ref} isVisible={inView}>
			<FirstRowSection3>
				<LogoMaxSection3 src={logoMaxSection3} alt="logo3" />
				<LogoMinSection3 src={logoMinSection3} alt="logo3" />
			</FirstRowSection3>
			<SecondRowSection3>
				<Bg3 src={bg3} alt="bg3" />
				<TextWrapperSection3>
					<TitleSection3>{lang['Title']}</TitleSection3>
					<ParagraphSection3>
						<Interweave allowAttributes content={lang['Paragraph']} />
					</ParagraphSection3>
				</TextWrapperSection3>
			</SecondRowSection3>
		</Section>
	);
}

export default React.memo(Section3);
