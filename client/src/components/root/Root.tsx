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

export const inViewOptions = {
	threshold: 0.355,
	triggerOnce: true,
	root: document.body
};

export default function Root() {
	const [showAuthModal, setShowAuthModal] = useState(false);

	const handleAuthClick = () => {
		setShowAuthModal(true);
	};

	return (
		<>
			<HideMenucitoStyle />
			<AuthModal opened={showAuthModal} setOpened={setShowAuthModal} />
			<Container>
				<Section1 handleAuthClick={handleAuthClick} />
				<Section2 />
				<Section3 />
				<Section4 />
				<InView
					root={inViewOptions.root}
					triggerOnce={inViewOptions.triggerOnce}
					threshold={inViewOptions.threshold}
				>
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
