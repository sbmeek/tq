import React, { useState, useContext, Fragment } from 'react'
import './AuthModal.css'
import Signup from './signup/Signup'
import facebookLogo from 'assets/images/icons/share-icons/facebook.svg'
import googleLogo from 'assets/images/icons/share-icons/google.svg'
import Login from './login/Login'
import { InitContext } from 'global/context/InitContext'
import arrow from 'assets/images/left-arrow.svg'
import tqLogo from 'assets/images/ltqrNEW.png'
import GoogleLogin from 'react-google-login'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { getAuthInfoAction } from 'global/ducks/authDucks'

export default function AuthModal<
	T extends {
		opened: boolean
		setOpened: React.Dispatch<React.SetStateAction<boolean>>
		setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ opened, setOpened, setShowMenu }: T) {
	const { AuthModal: lang } = useContext(InitContext).state.lang
	const dispatch = useDispatch()
	const [showSignedupComp, setShowSignedupComp] = useState(false)
	const [showLogin, setShowLogin] = useState(true)
	const [errMsg, setErrMsg] = useState('')

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
	}

	const handleSignLoginClick = () => {
		setShowLogin(!showLogin)
	}

	const handleGoogleAuth = async (response: any) => {
		if(response.tokenId){
            const res = await Axios.post('/user/auth/google', {
                tokenId: response.tokenId,
            })

            if (res.data.emailNotVerified) {
                setErrMsg(lang['EmailNotVerified'])
            } else if (!res.data.ok) {
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
					>
						{!showSignedupComp ? (
							<Fragment>
								<h1>
									{showLogin ? (
										lang['FormLoginTitle']
									) : (
										<>
											{lang['FormSignupTitle']}
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
												<span>or</span>
												<hr></hr>
											</div>
											<div styleName="buttons-sign">
												<GoogleLogin
													clientId={process.env.REACT_APP_G_CLIENT_ID as string}
													render={(renderProps) => (
														<button
															styleName="google"
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
													onSuccess={handleGoogleAuth}
													onFailure={handleGoogleAuth}
												/>
												<button styleName="facebook">
													<img src={facebookLogo} alt="facebook logo" />
													<span>
														<hr></hr>
														{showLogin
															? lang['LoginWith'].replace('{OAuth}', 'Facebook')
															: lang['SignupWith'].replace(
																	'{OAuth}',
																	'Facebook'
															  )}
													</span>
												</button>
											</div>
										</div>
									</div>
								</div>
								<span
									style={{
										position: 'absolute',
										top: showLogin ? '89%' : '93%',
									}}
								>
									{showLogin
										? lang['FormLoginFooter']
										: lang['FormSignupFooter']}{'   '}
									<span styleName="toggler" onClick={handleSignLoginClick}>
										{showLogin
											? lang['FormSignupFooterToggler']
											: lang['FormLoginFooterToggler']}
									</span>
								</span>
							</Fragment>
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
