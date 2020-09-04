import React, { useState, useContext, Fragment } from 'react'
import './AuthModal.css'
import Signup from './signup/Signup'
import facebookLogo from 'assets/images/icons/share-icons/facebook.svg'
import googleLogo from 'assets/images/icons/share-icons/google.svg'
import Login from './login/Login'
import { InitContext } from 'global/context/InitContext'
import arrow from 'assets/images/left-arrow.svg'
import tqLogo from 'assets/images/ltqrNEW.png'

export default function AuthModal<
	T extends {
		opened: boolean
		setOpened: React.Dispatch<React.SetStateAction<boolean>>
        setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ opened, setOpened, setShowMenu }: T) {
	const { AuthModal: lang } = useContext(InitContext).state.lang

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

	return (
		<div>
            {opened &&
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
                                                setShowSignedupComp={setShowSignedupComp}
                                                setShowLogin={setShowLogin}
                                            />
                                        )}
                                        <div styleName="separador">
                                            <hr></hr>
                                            <div styleName="buttons-sign">
                                                <button styleName="google">
                                                    <img src={googleLogo} alt="google logo" />
                                                    <span>
                                                        <hr></hr>
                                                        {lang['LoginWith'].replace('{OAuth}', 'Google')}
                                                    </span>
                                                </button>
                                                <button styleName="facebook">
                                                    <img src={facebookLogo} alt="facebook logo" />
                                                    <span>
                                                        <hr></hr>
                                                        {lang['LoginWith'].replace('{OAuth}', 'Facebook')}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: showLogin ? '85%' : '93%',
                                        marginTop: errMsg.length > 0 ? '20px' : '0',
                                    }}
                                >
                                    {showLogin ? lang['FormLoginFooter'] : lang['FormSignupFooter']}{' '}
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
            }
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
