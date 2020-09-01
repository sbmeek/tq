import React, { useState, useContext } from 'react'
import './AuthModal.css'
import Signup from './signup/Signup'
import facebookLogo from 'assets/images/icons/share-icons/facebook.svg'
import googleLogo from 'assets/images/icons/share-icons/google.svg'
import Login from './login/Login'
import { InitContext } from 'global/context/InitContext'

export default function AuthModal<
	T extends {
		opened: boolean
		setOpened: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ opened, setOpened }: T) {
    const { AuthModal: lang } = useContext(InitContext).state.lang

	const [showLogin, setShowLogin] = useState(true)

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
    }
    
    const handleSignLoginClick = () => {
        setShowLogin(!showLogin)
    }

	return (
		<div>
			<div
				onClick={handleOverlayClick}
				styleName={`overlay ${opened ? 'active' : ''}`}
				id="overlay"
			>
				<div
					styleName="container"
					style={{
						height: showLogin ? '376px' : '536px',
					}}
				>
					<h1>{showLogin ? lang['FormLoginTitle'] : lang['FormSignupTitle']}</h1>
					<div styleName="inputs-and-buttons">
						<div styleName="inputs-and-sign-container">
							{showLogin ? <Login /> : <Signup />}
							<div styleName="separador">
								<hr></hr>
								<div styleName="buttons-sign">
									<button styleName="google">
										<img src={googleLogo} alt="google logo" />
										<span>
											<hr></hr>{lang['LoginWith'].replace('{OAuth}', 'Google')}
										</span>
									</button>
									<button styleName="facebook">
										<img src={facebookLogo} alt="facebook logo" />
										<span>
											<hr></hr>{lang['LoginWith'].replace('{OAuth}', 'Facebook')}
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
					<span
                        style={{
                            margin: showLogin ? '30px' : '10px'
                        }}
                    >
						{showLogin ? lang['FormLoginFooter'] : lang['FormSignupFooter']}{' '}
						<span styleName="toggler" onClick={handleSignLoginClick}>
                            {showLogin ? lang['FormSignupFooterToggler'] : lang['FormLoginFooterToggler']}
						</span>
					</span>
				</div>
			</div>
		</div>
	)
}
