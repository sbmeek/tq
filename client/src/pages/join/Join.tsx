import React, { useState, useEffect, useContext } from 'react';
import logo from 'assets/images/ltqrNEW.png';
import { InitContext } from 'global/context/InitContext';
import Help from 'assets/images/icons/icons-main/icon-help.svg';
import info from 'assets/images/icons/icons-main/icon-info.svg';
import {
	MainContainer,
	FormContainer,
	LogoContainer,
	TQLogo,
	MainElementsContainer,
	Wrapper,
	btnCustomStyle,
	BtnsWrapper
} from './Join.style';
import Button from 'shared/button/Button';
import MainTextInput from 'components/main-text-input/MainTextInput';

export default function MainLogin() {
	const [username, setUsername] = useState('');
	const [isLogoLoaded, setIsLogoLoaded] = useState(false);
	const [isFieldLoaded, setIsFieldLoaded] = useState(false);

	const {
		state: {
			lang: { Main: lang }
		}
	} = useContext(InitContext);

	useEffect(() => {
		(document as any).fonts.ready.then(function () {
			setIsFieldLoaded(true);
		});
	});

	return (
		<MainContainer data-testid="main-container">
			<FormContainer>
				<LogoContainer>
					<TQLogo
						isLogoLoaded={isLogoLoaded}
						src={logo}
						draggable="false"
						alt="logo"
						onLoad={() => setIsLogoLoaded(true)}
					/>
				</LogoContainer>
				<MainElementsContainer>
					<Wrapper isFieldLoaded={isFieldLoaded}>
						<MainTextInput username={username} setUsername={setUsername} />
						<BtnsWrapper>
							<Button
								type="button"
								group="primary"
								hoverMode="color"
								customStyle={btnCustomStyle}
							>
								{lang['BtnInfo']}
								<img src={info} alt="arrow" />
							</Button>
							<Button
								type="button"
								group="primary"
								hoverMode="color"
								customStyle={btnCustomStyle}
							>
								{lang['BtnHelp']}
								<img src={Help} alt="arrow" />
							</Button>
						</BtnsWrapper>
					</Wrapper>
				</MainElementsContainer>
			</FormContainer>
		</MainContainer>
	);
}
