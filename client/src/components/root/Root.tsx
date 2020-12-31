import React, { useContext } from 'react';
import InView from 'react-intersection-observer';
import Button from 'shared/button/Button';
import { Link } from 'react-router-dom';
import { InitContext } from 'global/context/InitContext';
import Interweave from 'interweave';
import 'intersection-observer';

import logoMaxSection1 from 'assets/images/presentation/logo_max_section1.svg';
import logoSection2 from 'assets/images/presentation/logo_section2.png';

import bg1 from 'assets/images/presentation/bg1.svg';
import bg2 from 'assets/images/presentation/bg2.svg';

import {
	Container,
	Section,
	HideMenucitoStyle,
	btnCustomStyle
} from './Root.style';

import {
	InnerWrapperSection1,
	TitleSection1,
	ParagraphSection1,
	FirstRowSection1,
	LogoSection1,
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

	return (
		<>
			<HideMenucitoStyle />
			<Container>
				<InView triggerOnce threshold={0.244}>
					{({ inView, ref }) => (
						<Section ref={ref} isVisible={inView}>
							<FirstRowSection1>
								<LogoSection1 src={logoMaxSection1} alt="logo-section1" />
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
				<InView triggerOnce threshold={0.244}>
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
			</Container>
		</>
	);
}
