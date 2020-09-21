import React, { useState, useContext, useRef } from 'react'
import Signup from './signup/Signup'
import facebookLogo from 'assets/images/icons/share-icons/facebook.svg'
import googleLogo from 'assets/images/icons/share-icons/google.svg'
import Login from './login/Login'
import arrow from 'assets/images/left-arrow.svg'
import tqLogo from 'assets/images/ltqrNEW.png'
import Axios from 'axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import { ReactFacebookLoginInfo } from 'react-facebook-login'
import { InitContext } from 'global/context/InitContext'
import { useDispatch } from 'react-redux'
import { getAuthInfoAction } from 'global/ducks/authDucks'

import styles from './AuthModal.css'

export default function AuthModal<
	T extends {
		opened: boolean
		isMobile: boolean
		setOpened: React.Dispatch<React.SetStateAction<boolean>>
		setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ opened, isMobile, setOpened, setShowMenu }: T) {
	const [errMsg, setErrMsg] = useState('')
	const [showLogin, setShowLogin] = useState(true)
	const [showSignedupComp, setShowSignedupComp] = useState(false)

	const { AuthModal: lang } = useContext(InitContext).state.lang
	const mainInnerContainer = useRef<HTMLDivElement>(null)

	const dispatch = useDispatch()

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay' && !isMobile) setOpened(!opened)
	}

	const handleTogglerClick = () => {
		const mainInnerContainerCurr = mainInnerContainer.current!
		if (isMobile) {
			mainInnerContainerCurr.classList.add(styles['toggleContent'])
			mainInnerContainerCurr.onanimationend = () => {
				mainInnerContainerCurr.classList.remove(styles['toggleContent'])
			}
		}
		setShowLogin(!showLogin)
	}

	const handleGoogleAuth = async (response: GoogleLoginResponse) => {
		if (response.tokenId) {
			const res = await Axios.post('/user/auth/google', {
				tokenId: response.tokenId,
			})

			if (!res.data.ok) {
				setErrMsg(lang['CredentialsErrMsg'])
			} else {
				setErrMsg('')
				setOpened(false)
				setShowMenu(false)
				dispatch(getAuthInfoAction())
			}
		}
	}

	const handleFacebookAuth = async (response: ReactFacebookLoginInfo) => {
		const { accessToken, id: userId } = response
		if (response.accessToken) {
			const res = await Axios.post('/user/auth/facebook', {
				accessToken,
				userId,
			})

			if (!res.data.ok) {
				setErrMsg(lang['CredentialsErrMsg'])
			} else {
				setErrMsg('')
				setOpened(false)
				setShowMenu(false)
				dispatch(getAuthInfoAction())
			}
		}
	}

	return (
		<div>
			{opened && (
				<div
					onClick={handleOverlayClick}
					styleName={`overlay ${opened ? 'active' : ''}`}
					id="overlay"
				>
					<div
						styleName="container"
						style={{
							height: showLogin ? '376px' : '556px',
                        }}
                        aria-labelledby={showLogin ? 'login-container' : 'signup-container'}
					>
						{!showSignedupComp ? (
							<div styleName="inner-container" ref={mainInnerContainer}>
								<h1
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
								</h1>
								<div styleName="inputs-and-buttons">
									<div styleName="inputs-and-sign-container">
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
												setShowSignedupComp={setShowSignedupComp}
												setShowLogin={setShowLogin}
											/>
										)}
										<div styleName="separador-container">
											<div styleName="separador">
												<hr></hr>
												<span>Or</span>
												<hr></hr>
											</div>
											<div styleName="buttons-sign">
												<GoogleLogin
													clientId={process.env.REACT_APP_G_CLIENT_ID as string}
													render={(renderProps) => (
														<button
															styleName="btn-oauth google"
															onClick={renderProps.onClick}
															disabled={renderProps.disabled}
														>
															<img src={googleLogo} alt="google logo" />
															<span>
																<hr></hr>

																{showLogin
																	? lang['LoginWith'].replace(
																			'{OAuth}',
																			'Google'
																	  )
																	: lang['SignupWith'].replace(
																			'{OAuth}',
																			'Google'
																	  )}
															</span>
														</button>
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
														<button
															onClick={renderProps.onClick}
															disabled={renderProps.isDisabled}
															styleName="btn-oauth facebook"
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
														</button>
													)}
												></FacebookLogin>
											</div>
										</div>
									</div>
								</div>
								<span
									style={{
										marginTop:
											!isMobile && showLogin
												? '20px'
												: !isMobile && !showLogin
												? '10px'
												: '0',
									}}
								>
									{showLogin
										? lang['FormLoginFooter']
										: lang['FormSignupFooter']}
									{'   '}
									<span styleName="toggler" onClick={handleTogglerClick}>
										{showLogin
											? lang['FormSignupFooterToggler']
											: lang['FormLoginFooterToggler']}
									</span>
								</span>
							</div>
						) : (
							<Signedup
								setShowSignedupComp={setShowSignedupComp}
								setShowLogin={setShowLogin}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

function Signedup<
	T extends {
		setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
		setShowSignedupComp: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ setShowLogin, setShowSignedupComp }: T) {
	const { Signedup: lang } = useContext(InitContext).state.lang.AuthModal.Signup

	const handleClick = () => {
		setShowLogin(true)
		setShowSignedupComp(false)
	}

	return (
		<div styleName="signedup-container">
			<img styleName="tqlogo" src={tqLogo} alt="tq logo" />
			<div styleName="toggler-container">
				<h1>{lang['title']}</h1>
				<p>{lang['helpText']}</p>
				<div styleName="login-arrow-container" onClick={handleClick}>
					<span styleName="toggler">{lang['logInBtn']}</span>
					<img src={arrow} alt="arrow" styleName="arrow" />
				</div>
			</div>
		</div>
	)
}
