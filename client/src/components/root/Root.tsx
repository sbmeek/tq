import React, { useContext, useState } from 'react';
import InView from 'react-intersection-observer';
import { InitContext } from 'global/context/InitContext';
import AuthModal from '../authModal/AuthModal';
import LangToggler from 'components/langToggler/LangToggler';
import 'intersection-observer';
import logoFooter from 'assets/images/presentation/logo_footer.svg';

import {
	Container,
	HideMenucitoStyle,
	Footer,
	LogoFooterWrapper,
	ColumnFooter,
	LinkFooter,
	GroupTitleFooter,
	GroupWrapper,
	InnerContainerFooter
} from './Root.style';

import Section1 from './Sections/section1/Section1';
import Section2 from './Sections/section2/Section2';
import Section3 from './Sections/section3/Section3';
import Section4 from './Sections/section4/Section4';
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
						<Section4 inView={inView} inViewRef={ref}></Section4>
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
							<LangToggler />
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
