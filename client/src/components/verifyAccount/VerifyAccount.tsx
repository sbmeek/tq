import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router';
import './VerifyAccount.css';
import arrow from 'assets/images/left-arrow.svg';
import { InitContext } from 'global/context/InitContext';
import { Link } from 'react-router-dom';

export default function VerifyAccount() {
	const { VerifyAccount: lang } = useContext(InitContext).state.lang;
	const [isVerificationOk, setIsVerificationOk] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		let encToken = decodeURIComponent(params.get('t') || '');

		(async () => {
			const res = await Axios.post('/user/verifyEmailKey', { encToken });
			setIsVerificationOk(res.data.ok);
		})();
	}, [location.search]);

	return (
		<div styleName="container">
			<div styleName="inner-container">
				<h1>
					{isVerificationOk
						? lang['TitleIsVerificationOk']
						: lang['TitleIsVerificationNotOk']}
				</h1>
				<p
					style={{
						marginTop: !isVerificationOk ? '10px' : '0',
						textAlign: isVerificationOk ? 'center' : 'left'
					}}
				>
					{isVerificationOk
						? lang['TextIsVerificationOk']
						: lang['TextIsVerificationNotOk']}
				</p>
				{isVerificationOk && (
					<div styleName="login-arrow-container">
						<Link to="/?opt=show-login" styleName="toggler">
							{lang['LogInBtn']}
						</Link>
						<img src={arrow} alt="arrow" styleName="arrow" />
					</div>
				)}
			</div>
		</div>
	);
}
