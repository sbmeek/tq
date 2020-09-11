import React, { useState, useEffect } from 'react'
import flecha from 'assets/images/left-arrow.svg'
import menulog from 'assets/images/menu-tq.svg'
import FirstTimeHelpBox from '../firstTimeHelpBox/FirstTimeHelpBox'
import AuthModal from '../authModal/AuthModal'
import home from 'assets/images/icons/icons-menu/icon-home.svg'
import cloud from 'assets/images/icons/icons-menu/icon-cloud.svg'
import account from 'assets/images/icons/icons-menu/icon-account.svg'
import tqIcon from 'assets/images/msg/PerfilTQ.png'
import Axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { getAuthInfoAction } from 'global/ducks/authDucks'

import './Menu.css'

export default function Menu() {
	const [isUserNew, setIsUserNew] = useState(true)
	const [showNewUserModal, setShowNewUserModal] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [enoughSpace, setEnoughSpace] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    
	const { isAuthenticated } = useSelector((state: RootStateOrAny) => state.auth)
    const dispatch = useDispatch()

    const location = useLocation();
    
    const checkScreenSize = () => {
        setIsMobile(document.documentElement.clientWidth <= 600);
    }

    useEffect(() => {
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        let opt = params.get('opt') || '';
        if(opt === 'show-login'){
            setShowAuthModal(true)
        }
    }, [location.search])

	useEffect(() => {
		setTimeout(() => {
			if (!localStorage.getItem('sbm-tq-ft')) {
				setIsUserNew(true)
				setShowNewUserModal(true)
				localStorage.setItem('sbm-tq-ft', '1')
			} else {
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

	const handleAuthClick = () => {
        setShowMenu(false)
        setShowAuthModal(true)
	}

	const handleLogoutClick = async () => {
		const res = await Axios.post('/user/logout')
		if (res.data.ok) {
			setShowMenu(false)
			dispatch(getAuthInfoAction())
		}
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
									<img src={home} alt="home" />
									<span>Inicio</span>
								</button>
							</Link>
						</div>
						<div styleName="btn-container">
							<Link to="/messages">
								<button styleName="sidebar-button">
									<img src={cloud} alt="home" />
									<span>Bandeja</span>
								</button>
							</Link>
						</div>
						{!isAuthenticated && (
							<div styleName="btn-container">
								<button
									styleName="sidebar-button"
									onClick={handleAuthClick}
								>
									<img src={account} alt="home" />
									<span>Auth</span>
								</button>
							</div>
						)}
						{isAuthenticated && (
							<div styleName="btn-container">
								<button styleName="sidebar-button" onClick={handleLogoutClick}>
									<img src={account} alt="home" />
									<span>Log out</span>
								</button>
							</div>
						)}
						<div styleName="footer-container">
							<div styleName="btn-container sbmeek-container">
								<button styleName="sidebar-button sbmeek">
									<img src={tqIcon} alt="tq-fav" />
									<span>SB Meek</span>
								</button>
							</div>
							<a href="/terms">
								<button styleName="btn-terms">Términos y Condiciones</button>
							</a>
						</div>
					</div>
				</div>
			</div>
			{isUserNew && <FirstTimeHelpBox active={showNewUserModal} />}
			<AuthModal
				opened={showAuthModal}
				setOpened={setShowAuthModal}
                setShowMenu={setShowMenu}
                isMobile={isMobile}
			/>
		</div>
	)
}
