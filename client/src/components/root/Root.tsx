import React, { useContext, useState } from 'react';
import InView from 'react-intersection-observer';
import { InitContext } from 'global/context/InitContext';
import AuthModal from '../authModal/AuthModal';
import Interweave from 'interweave';
import 'intersection-observer';

import logoMaxSection4 from 'assets/images/presentation/logo_max_section4.png';
import logoMinSection4 from 'assets/images/presentation/logo_min_section4.png';
import logoReMinSection4 from 'assets/images/presentation/logo_remin_section4.png';
import logoFooter from 'assets/images/presentation/logo_footer.svg';

import bg4 from 'assets/images/presentation/bg4.svg';

import arrowFooter from 'assets/images/presentation/arrow_lang-toggler.svg';
import esFlag from 'assets/images/presentation/lang-flags/es-flag.svg';

import {
	Container,
	Section,
	HideMenucitoStyle,
	Footer,
	LogoFooterWrapper,
	LangToggler,
	ColumnFooter,
	FlagLangToggler,
	LinkFooter,
	GroupTitleFooter,
	GroupWrapper,
	InnerContainerFooter
} from './Root.style';

import {
	Bg4,
	FirstRowSection4,
	LogoImgSection4,
	LogoPicSection4,
	ParagraphSection4,
	SecondRowSection4,
	TextWrapperSection4,
	TitleSection4
} from './Sections/Section4.style';

import Section1 from './Sections/section1/Section1';
import Section2 from './Sections/section2/Section2';
import Section3 from './Sections/section3/Section3';
import Section5 from './Sections/section5/Section5';

export type SectionPropsType = {
	inView: boolean;
	inViewRef:
		| React.RefObject<any>
		| ((node?: Element | null | undefined) => void);
};

export default function Root() {
	const {
		state: {
			lang: { Root: lang }
		}
	} = useContext(InitContext);
	const [isContainerLoaded, setIsContainerLoaded] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);

	const handleAuthClick = () => {
		setShowAuthModal(true);
	};

	return (
		<>
			<HideMenucitoStyle />
			<AuthModal opened={showAuthModal} setOpened={setShowAuthModal} />
			<Container onLoad={() => setIsContainerLoaded(true)}>
				<InView skip={!isContainerLoaded} triggerOnce threshold={0.244}>
					{({ inView, ref }) => (
						<Section1
							inView={inView}
							inViewRef={ref}
							handleAuthClick={handleAuthClick}
						/>
					)}
				</InView>
				<InView skip={!isContainerLoaded} triggerOnce threshold={0.244}>
					{({ inView, ref }) => <Section2 inView={inView} inViewRef={ref} />}
				</InView>
				<InView skip={!isContainerLoaded} triggerOnce threshold={0.244}>
					{({ inView, ref }) => (
						<Section3 inView={inView} inViewRef={ref}></Section3>
					)}
				</InView>
				<InView skip={!isContainerLoaded} triggerOnce threshold={0.244}>
					{({ inView, ref }) => (
						<Section ref={ref} isVisible={inView}>
							<FirstRowSection4>
								<LogoPicSection4>
									<source
										media="(max-width: 390px)"
										srcSet={logoReMinSection4}
									/>
									<source media="(max-width: 501px)" srcSet={logoMinSection4} />
									<LogoImgSection4 src={logoMaxSection4} alt="logo-section4" />
								</LogoPicSection4>
							</FirstRowSection4>
							<SecondRowSection4>
								<Bg4 src={bg4} alt="bg4" />
								<TextWrapperSection4>
									<TitleSection4>{lang.Section4['Title']}</TitleSection4>
									<ParagraphSection4>
										<Interweave
											allowAttributes
											content={lang.Section4['Paragraph']}
										/>
									</ParagraphSection4>
								</TextWrapperSection4>
							</SecondRowSection4>
						</Section>
					)}
				</InView>
				<InView skip={!isContainerLoaded} triggerOnce threshold={0.244}>
					{({ inView, ref }) => <Section5 inView={inView} inViewRef={ref} />}
				</InView>
				<Footer>
					<InnerContainerFooter>
						<ColumnFooter firstColumn>
							<LogoFooterWrapper>
								<img src={logoFooter} alt="logo-footer" />
								<h1>TiKiu</h1>
							</LogoFooterWrapper>
							<LangToggler>
								<FlagLangToggler src={esFlag} alt="es-flag" />
								<span>Español</span>
								<img src={arrowFooter} alt="arrow_lang-toggler" />
							</LangToggler>
						</ColumnFooter>
						<ColumnFooter>
							<GroupWrapper>
								<GroupTitleFooter>{lang.Footer.Group1.Title}</GroupTitleFooter>
								{lang.Footer.Group1.Items.map((item: string, idx: number) => (
									<LinkFooter key={idx}>{item}</LinkFooter>
								))}
							</GroupWrapper>
						</ColumnFooter>
						<ColumnFooter>
							<GroupWrapper>
								<GroupTitleFooter>{lang.Footer.Group2.Title}</GroupTitleFooter>
								{lang.Footer.Group2.Items.map((item: string, idx: number) => (
									<LinkFooter key={idx}>{item}</LinkFooter>
								))}
							</GroupWrapper>
						</ColumnFooter>
						<ColumnFooter>
							<GroupWrapper>
								<GroupTitleFooter>{lang.Footer.Group3.Title}</GroupTitleFooter>
								{lang.Footer.Group3.Items.map((item: string, idx: number) => (
									<LinkFooter key={idx}>{item}</LinkFooter>
								))}
							</GroupWrapper>
						</ColumnFooter>
						<ColumnFooter>
							<GroupWrapper>
								<GroupTitleFooter>{lang.Footer.Group4.Title}</GroupTitleFooter>
								{lang.Footer.Group4.Items.map((item: string, idx: number) => (
									<LinkFooter key={idx}>{item}</LinkFooter>
								))}
							</GroupWrapper>
						</ColumnFooter>
					</InnerContainerFooter>
				</Footer>
			</Container>
		</>
	);
}
