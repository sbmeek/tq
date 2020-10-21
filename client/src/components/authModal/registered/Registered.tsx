import React, { useContext } from 'react';
import { InitContext } from 'global/context/InitContext';
import arrow from 'assets/images/left-arrow.svg';
import tqLogo from 'assets/images/ltqrNEW.png';
import { Toggler } from '../AuthModal.style';

import './Registered.css';

export default function Registered<
	T extends {
		setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
		setShowRegisteredComp: React.Dispatch<React.SetStateAction<boolean>>;
	}
>({ setShowLogin, setShowRegisteredComp }: T) {
	const { Signedup: lang } = useContext(
		InitContext
	).state.lang.AuthModal.Signup;

	const handleClick = () => {
		setShowLogin(true);
		setShowRegisteredComp(false);
	};

	return (
		<div styleName="signedup-container">
			<img styleName="tqlogo" src={tqLogo} alt="tq logo" />
			<div styleName="toggler-container">
				<h1>{lang['title']}</h1>
				<p>{lang['helpText']}</p>
				<div styleName="login-arrow-container" onClick={handleClick}>
					<Toggler>{lang['logInBtn']}</Toggler>
					<img src={arrow} alt="arrow" styleName="arrow" />
				</div>
			</div>
		</div>
	);
}
