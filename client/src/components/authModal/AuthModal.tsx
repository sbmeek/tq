import React, { useState, useContext } from 'react';
import Signup from './signup/Signup';
import facebookLogo from 'assets/images/icons/share-icons/facebook.svg';
import googleLogo from 'assets/images/icons/share-icons/google.svg';
import Login from './login/Login';
import Axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { InitContext } from 'global/context/InitContext';
import { useDispatch } from 'react-redux';
import { getAuthInfoAction } from 'global/ducks/authDucks';
import Registered from './registered/Registered';

import {
	containerCustomStyles,
	overlayCustomStyles,
	Content,
	Title,
	Toggler,
	FormWrapper,
	FormInnerWrapper,
	Separator,
	BtnOAuthContainer,
	ButtonOAuth,
	TogglerContainer
} from './AuthModal.style';
import Modal from 'shared/modal/Modal';

export default function AuthModal<
	T extends {
		opened: boolean;
		isMobile: boolean;
		setOpened: React.Dispatch<React.SetStateAction<boolean>>;
		setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
	}
>({ opened, isMobile, setOpened, setShowMenu }: T) {
	const [errMsg, setErrMsg] = useState('');
	const [showLogin, setShowLogin] = useState(true);
	const [toggleContentMobileAnim, setToggleContentMobileAnim] = useState(false);
	const [showRegisteredComp, setShowRegisteredComp] = useState(false);

	const { AuthModal: lang } = useContext(InitContext).state.lang;

	const dispatch = useDispatch();

	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
	) => {
		const targetElement = e.target as HTMLDivElement;
		if (targetElement.id === 'overlay' && !isMobile) setOpened(!opened);
	};

	const handleTogglerClick = () => {
		if (isMobile) {
			setToggleContentMobileAnim(true);
		}
		setShowLogin(!showLogin);
	};

	const handleGoogleAuth = async (response: GoogleLoginResponse) => {
		if (response.tokenId) {
			const res = await Axios.post('/user/auth/google', {
				tokenId: response.tokenId
			});

			if (!res.data.ok) {
				setErrMsg(lang['CredentialsErrMsg']);
			} else {
				setErrMsg('');
				setOpened(false);
				setShowMenu(false);
				dispatch(getAuthInfoAction());
			}
		}
	};

	const handleFacebookAuth = async (response: ReactFacebookLoginInfo) => {
		const { accessToken, id: userId } = response;
		if (response.accessToken) {
			const res = await Axios.post('/user/auth/facebook', {
				accessToken,
				userId
			});

			if (!res.data.ok) {
				setErrMsg(lang['CredentialsErrMsg']);
			} else {
				setErrMsg('');
				setOpened(false);
				setShowMenu(false);
				dispatch(getAuthInfoAction());
			}
		}
	};

	return (
		<>
			{opened && (
				<>
					<Modal
						customOverlay={{ customStyles: overlayCustomStyles }}
						customContainer={{
							props: { showLogin },
							customStyles: containerCustomStyles
						}}
						onOverlayMouseDownOrTouch={handleOverlayClick}
						isActive={opened}
					>
						{!showRegisteredComp ? (
							<Content
								onAnimationEnd={() => setToggleContentMobileAnim(false)}
								toggleContentAnim={toggleContentMobileAnim}
							>
								<Title
									aria-labelledby={showLogin ? 'login-title' : 'signup-title'}
								>
									{showLogin ? (
										lang['FormLoginTitle']
									) : (
										<>
											{!isMobile
												? lang['FormSignupTitle']
												: lang['FormSignupFooterToggler']}
											<small>{lang['FormSignupSubtitle']}</small>
										</>
									)}
								</Title>
								<FormWrapper>
									{showLogin ? (
										<Login
											errMsg={errMsg}
											setErrMsg={setErrMsg}
											setIsModalOpened={setOpened}
											setShowMenu={setShowMenu}
										/>
									) : (
										<Signup
											setOpened={setOpened}
											setShowRegisteredComp={setShowRegisteredComp}
											setShowLogin={setShowLogin}
										/>
									)}
									<FormInnerWrapper>
										<Separator>
											<hr />
											<span>Or</span>
											<hr />
										</Separator>
										<BtnOAuthContainer>
											<GoogleLogin
												clientId={process.env.REACT_APP_G_CLIENT_ID as string}
												render={(renderProps) => (
													<ButtonOAuth
														onClick={renderProps.onClick}
														disabled={renderProps.disabled}
														googleBtn
													>
														<img src={googleLogo} alt="google logo" />
														<span>
															<hr></hr>

															{showLogin
																? lang['LoginWith'].replace('{OAuth}', 'Google')
																: lang['SignupWith'].replace(
																		'{OAuth}',
																		'Google'
																  )}
														</span>
													</ButtonOAuth>
												)}
												onSuccess={(res) =>
													handleGoogleAuth(res as GoogleLoginResponse)
												}
												onFailure={handleGoogleAuth}
											/>
											<FacebookLogin
												appId={process.env.REACT_APP_F_APP_ID as string}
												callback={handleFacebookAuth}
												autoLoad={false}
												fields="id,name,email"
												render={(renderProps: any) => (
													<ButtonOAuth
														onClick={renderProps.onClick}
														disabled={renderProps.isDisabled}
														fbBtn
													>
														<img src={facebookLogo} alt="facebook logo" />
														<span>
															<hr></hr>
															{showLogin
																? lang['LoginWith'].replace(
																		'{OAuth}',
																		'Facebook'
																  )
																: lang['SignupWith'].replace(
																		'{OAuth}',
																		'Facebook'
																  )}
														</span>
													</ButtonOAuth>
												)}
											></FacebookLogin>
										</BtnOAuthContainer>
									</FormInnerWrapper>
								</FormWrapper>
								<TogglerContainer isMobile={isMobile} showLogin={showLogin}>
									{showLogin
										? lang['FormLoginFooter']
										: lang['FormSignupFooter']}
									{'   '}
									<Toggler onClick={handleTogglerClick}>
										{showLogin
											? lang['FormSignupFooterToggler']
											: lang['FormLoginFooterToggler']}
									</Toggler>
								</TogglerContainer>
							</Content>
						) : (
							<Registered
								setShowRegisteredComp={setShowRegisteredComp}
								setShowLogin={setShowLogin}
							/>
						)}
					</Modal>
				</>
			)}
		</>
	);
}
