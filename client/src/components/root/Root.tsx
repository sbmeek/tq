import React, { useContext, useState } from 'react';
import InView from 'react-intersection-observer';
import Button from 'shared/button/Button';
import { Link } from 'react-router-dom';
import { InitContext } from 'global/context/InitContext';
import AuthModal from '../authModal/AuthModal';
import Interweave from 'interweave';
import 'intersection-observer';

import logoMaxGeneral from 'assets/images/presentation/logo_max_general.png';
import logoMinGeneral from 'assets/images/presentation/logo_min_general.png';
import logoSection2 from 'assets/images/presentation/logo_section2.png';
import logoMaxSection3 from 'assets/images/presentation/logo_max_section3.png';
import logoMinSection3 from 'assets/images/presentation/logo_min_section3.png';
import logoMaxSection4 from 'assets/images/presentation/logo_max_section4.png';
import logoMinSection4 from 'assets/images/presentation/logo_min_section4.png';
import logoReMinSection4 from 'assets/images/presentation/logo_remin_section4.png';
import logoFooter from 'assets/images/presentation/logo_footer.svg';

import bg1 from 'assets/images/presentation/bg1.svg';
import bg2 from 'assets/images/presentation/bg2.svg';
import bg3 from 'assets/images/presentation/bg3.svg';
import bg4 from 'assets/images/presentation/bg4.svg';
import bg5 from 'assets/images/presentation/bg5.svg';

import arrowFooter from 'assets/images/presentation/arrow_lang-toggler.svg';
import esFlag from 'assets/images/presentation/lang-flags/es-flag.svg';
import sim from 'assets/images/presentation/sim.svg';

import {
	Container,
	Section,
	HideMenucitoStyle,
	btnCustomStyle,
	Footer,
	LogoFooterWrapper,
	LangToggler,
	ColumnFooter,
	FlagLangToggler,
	LinkFooter,
	GroupTitleFooter,
	GroupWrapper,
	InnerContainerFooter,
	ButtonFlyContainer
} from './Root.style';

import {
	InnerWrapperSection1,
	TitleSection1,
	ParagraphSection1,
	FirstRowSection1,
	LogoMaxSection1,
	LogoMinSection1,
	Bg1,
	SecondRowSection1
} from './Sections/Section1.style';

import {
	Bg2,
	FirstRowSection2,
	SecondRowSection2,
	LogoSection2,
	InnerWrapperSection2,
	TitleSection2,
	ParagraphSection2
} from './Sections/Section2.style';

import {
	Bg3,
	FirstRowSection3,
	LogoMaxSection3,
	LogoMinSection3,
	ParagraphSection3,
	SecondRowSection3,
	TextWrapperSection3,
	TitleSection3
} from './Sections/Section3.style';

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

import {
	LogoPicSection5,
	LogoImgSection5,
	InnerContainerSection5,
	Bg5,
	WrapperSection5,
	TitleSection5
} from './Sections/Section5.style';

function BtnCreateUsername<T extends { section: number | undefined }>({
	section
}: T) {
	const {
		state: {
			lang: { Root: lang }
		}
	} = useContext(InitContext);

	return (
		<Link to="/join">
			<Button
				type="button"
				group="secondary"
				hoverMode="color"
				customStyle={btnCustomStyle}
				customStyleProps={{ section }}
			>
				{lang['BtnCreateUsername']}
			</Button>
		</Link>
	);
}

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
						<Section ref={ref} isVisible={inView}>
							<FirstRowSection1>
								<ButtonFlyContainer>
									<button onClick={handleAuthClick}>
										{lang['BtnLogin']} <img src={sim} alt="sim" />
									</button>
								</ButtonFlyContainer>
								<LogoMaxSection1 src={logoMaxGeneral} alt="logo-section1" />
								<LogoMinSection1 src={logoMinGeneral} alt="logo-section1" />
							</FirstRowSection1>
							<SecondRowSection1>
								<Bg1 src={bg1} alt="bg1" />
								<InnerWrapperSection1>
									<TitleSection1>{lang.Section1['Title']}</TitleSection1>
									<ParagraphSection1>
										<Interweave
											allowAttributes={true}
											content={lang.Section1['Paragraph']}
										/>
									</ParagraphSection1>
									<BtnCreateUsername section={1} />
								</InnerWrapperSection1>
							</SecondRowSection1>
						</Section>
					)}
				</InView>
				<InView skip={!isContainerLoaded} triggerOnce threshold={0.244}>
					{({ inView, ref }) => (
						<Section ref={ref} isVisible={inView}>
							<FirstRowSection2>
								<LogoSection2 src={logoSection2} alt="logo-section2" />
							</FirstRowSection2>
							<SecondRowSection2>
								<Bg2 src={bg2} alt="bg2" />
								<InnerWrapperSection2>
									<TitleSection2>{lang.Section2['Title']}</TitleSection2>
									<ParagraphSection2>
										<Interweave
											allowAttributes={true}
											content={lang.Section2['Paragraph']}
										/>
									</ParagraphSection2>
									<BtnCreateUsername section={2} />
								</InnerWrapperSection2>
							</SecondRowSection2>
						</Section>
					)}
				</InView>
				<InView skip={!isContainerLoaded} triggerOnce threshold={0.244}>
					{({ inView, ref }) => (
						<Section ref={ref} isVisible={inView}>
							<FirstRowSection3>
								<LogoMaxSection3 src={logoMaxSection3} alt="logo3" />
								<LogoMinSection3 src={logoMinSection3} alt="logo3" />
							</FirstRowSection3>
							<SecondRowSection3>
								<Bg3 src={bg3} alt="bg3" />
								<TextWrapperSection3>
									<TitleSection3>{lang.Section3['Title']}</TitleSection3>
									<ParagraphSection3>
										<Interweave
											allowAttributes
											content={lang.Section3['Paragraph']}
										/>
									</ParagraphSection3>
								</TextWrapperSection3>
							</SecondRowSection3>
						</Section>
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
					{({ inView, ref }) => (
						<Section ref={ref} isVisible={inView}>
							<LogoPicSection5>
								<source media="(max-width: 515px)" srcSet={logoMinGeneral} />
								<LogoImgSection5 src={logoMaxGeneral} alt="logo-section5" />
							</LogoPicSection5>
							<InnerContainerSection5>
								<Bg5 src={bg5} />
								<WrapperSection5>
									<TitleSection5>{lang.Section5['Title']}</TitleSection5>
									<BtnCreateUsername section={5} />
								</WrapperSection5>
							</InnerContainerSection5>
						</Section>
					)}
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
