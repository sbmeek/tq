import React, { useState, useEffect } from 'react'
import flecha from 'assets/images/flecha-roja.png'
import menulog from 'assets/images/menu-logo.png'
import FirstTimeHelpBox from '../firstTimeHelpBox/FirstTimeHelpBox'
import RegisterModal from '../registerModal/RegisterModal'
import './Menu.css'
import { Link } from 'react-router-dom'

export default function Menu() {
	const [isUserNew, setIsUserNew] = useState(true)
	const [showNewUserModal, setShowNewUserModal] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [enoughSpace, setEnoughSpace] = useState(false)
	const [showRegisterModal, setShowRegisterModal] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			if (!localStorage.getItem('sbm-tq-ft')) {
                setIsUserNew(true)
                setShowNewUserModal(true)
				localStorage.setItem('sbm-tq-ft', '1')
			}else{
                setIsUserNew(false)
            }
		}, 1000)
	}, [])

	useEffect(() => {
		handleSpace()
		window.addEventListener('resize', handleSpace)
		return () => window.removeEventListener('resize', handleSpace)
	}, [])

	const handleSpace = () => {
		setEnoughSpace(window.innerWidth > 1311)
	}

	const toggleMenuActivation = () => {
		if (showNewUserModal) setShowNewUserModal(false)
		setShowMenu(!showMenu)
	}

	const handleRegisterClick = () => {
		setShowRegisterModal(true)
	}

	return (
		<div
			styleName="container-menu"
			style={{
				paddingRight: `${showMenu ? '27px' : ''}`,
			}}
		>
			<div
				styleName={`overlay ${showMenu && !enoughSpace ? 'active' : ''}`}
				onClick={toggleMenuActivation}
				onTouchStartCapture={toggleMenuActivation}
			></div>
			<div>
				<button
					styleName={`btn-menu ${showMenu ? 'active' : ''}`}
					onClick={toggleMenuActivation}
				>
					<img src={flecha} alt="flecha roja" />
					<img src={menulog} alt="menu logo" />
				</button>
				<div styleName={`sidebar ${showMenu ? 'active' : ''}`}>
					<div>
						<div styleName="sidebar-title">
							<h1>Menu</h1>
						</div>
						<div styleName="btn-container">
							<Link to="/Link">
								<button styleName="sidebar-button">
									<i>i</i>
									<span>Inicio</span>
								</button>
							</Link>
						</div>
						<div styleName="btn-container">
							<Link to="/messages">
								<button styleName="sidebar-button">
									<i>i</i>
									<span>Bandeja</span>
								</button>
							</Link>
						</div>
						<div styleName="btn-container">
							<button styleName="sidebar-button" onClick={handleRegisterClick}>
								<i>i</i>
								<span>Registrar</span>
							</button>
						</div>
						<div styleName="btn-container">
							<button styleName="sidebar-button">
								<i>i</i>
								<span>SB Meek</span>
							</button>
						</div>
						<div styleName="terms-container">
							<a href="/terms">
								<button styleName="btn-terms">Términos y Condiciones</button>
							</a>
						</div>
					</div>
				</div>
			</div>
			{isUserNew && <FirstTimeHelpBox active={showNewUserModal} />}
			<RegisterModal
				opened={showRegisterModal}
				setOpened={setShowRegisterModal}
			/>
		</div>
	)
}
