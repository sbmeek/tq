import React from 'react';
import Button from 'shared/button/Button';
import logo from '../../assets/images/logo.png';
import {
	Container,
	InnerContainer,
	Main,
	LogoImg,
	InsideText,
	Err4s,
	FirstRowText,
	SecondRowText,
	btnCustomStyle,
	LinkStyled
} from './Error404.style';

export default function Error404() {
	return (
		<Main>
			<Container>
				<InnerContainer>
					<LogoImg src={logo} alt="logo" draggable="false" />
					<InsideText>
						<h2>
							Ooops... Error <Err4s>4</Err4s>
							<span style={{ color: '#00909E' }}>0</span>
							<Err4s>4</Err4s>
						</h2>
						<FirstRowText>
							Lo sentimos. La p&aacute;gina que intentaste buscar no existe.
						</FirstRowText>
						<SecondRowText>
							Por favor verifique la direcci&oacute;n introducida e intentelo de
							nuevo.
						</SecondRowText>
						<br />
						<LinkStyled to="/">
							<Button
								customStyle={btnCustomStyle}
								hoverMode="color"
								group="primary"
							>
								Inicio
							</Button>
						</LinkStyled>
					</InsideText>
				</InnerContainer>
			</Container>
		</Main>
	);
}
