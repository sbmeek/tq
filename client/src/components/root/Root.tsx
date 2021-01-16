import React, { useState } from 'react';
import InView from 'react-intersection-observer';
import AuthModal from '../authModal/AuthModal';
import 'intersection-observer';

import { Container, HideMenucitoStyle } from './Root.style';

import Section1 from './Sections/section1/Section1';
import Section2 from './Sections/section2/Section2';
import Section3 from './Sections/section3/Section3';
import Section4 from './Sections/section4/Section4';
import Section5 from './Sections/section5/Section5';
import Footer from './Footer/Footer';

export type SectionPropsType = {
	inView: boolean;
	inViewRef:
		| React.RefObject<any>
		| ((node?: Element | null | undefined) => void);
};

export default function Root() {
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
					{({ inView, ref }) => (
						<>
							<Section5 inView={inView} inViewRef={ref} />
							<Footer />
						</>
					)}
				</InView>
			</Container>
		</>
	);
}
