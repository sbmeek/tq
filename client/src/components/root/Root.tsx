import React, { useRef } from 'react';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import logoMax from 'assets/images/presentation/imalogo_max.svg';
import bg1 from 'assets/images/presentation/bg1.svg';
import Button from 'shared/button/Button';
import { Link } from 'react-router-dom';
import {
	Container,
	Section,
	HideMenucitoStyle,
	InnerWrapper,
	btnCustomStyle,
	FirstRow,
	SecondRow
} from './Root.style';

export default function Root() {
	const handleChange = (e: any) => {
		console.log(e);
	};

	const options = useRef({
		onChange: handleChange,
		root: '#scrolling-container',
		rootMargin: '0% 0% -25%'
	});

	return (
		<>
			<HideMenucitoStyle />
			<div id="scrolling-container" style={{ height: '100%' }}>
				<Observer {...options.current}>
					<Container>
						<Section>
							<FirstRow>
								<img src={logoMax} className="logo1" alt="logo" />
							</FirstRow>
							<SecondRow>
								<img src={bg1} className="bg1" alt="bg1" />
								<InnerWrapper>
									<h1>Mensajes an&oacute;nimos</h1>
									<span>
										Recibe{' '}
										<span style={{ color: 'var(--tq-blue-01)' }}>
											mensajes anónimos
										</span>{' '}
										y compártelos en tus estados de forma{' '}
										<span style={{ color: 'var(--tq-blue-01)' }}>
											rápida y sencilla
										</span>
										.
									</span>
									<Link to="/join">
										<Button
											type="button"
											group="secondary"
											hoverMode="color"
											customStyle={btnCustomStyle}
										>
											Crear nombre de usuario
										</Button>
									</Link>
								</InnerWrapper>
							</SecondRow>
						</Section>
						<Section>root2</Section>
					</Container>
				</Observer>
			</div>
		</>
	);
}
