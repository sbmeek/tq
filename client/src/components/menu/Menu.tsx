import React, { useState, useEffect, useContext } from 'react';
import flecha from 'assets/images/left-arrow.svg';
import menulog from 'assets/images/menu-tq.svg';
import FirstTimeHelpBox from '../firstTimeHelpBox/FirstTimeHelpBox';
import AuthModal from '../authModal/AuthModal';
import home from 'assets/images/icons/icons-menu/icon-home.svg';
import cloud from 'assets/images/icons/icons-menu/icon-cloud.svg';
import account from 'assets/images/icons/icons-menu/icon-account.svg';
import arrowexit from 'assets/images/icons/icons-inbox/icon-exit.svg';
import tqIcon from 'assets/images/msg/profile-tq.png';
import Axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { getAuthInfoAction } from 'global/ducks/authDucks';

import './Menu.css';
import { InitContext } from 'global/context/InitContext';

export default function Menu() {
	const [isUserNew, setIsUserNew] = useState(true);
	const [showNewUserModal, setShowNewUserModal] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [enoughSpace, setEnoughSpace] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const { Menu: lang } = useContext(InitContext).state.lang;

	const { isAuthenticated } = useSelector(
		(state: RootStateOrAny) => state.auth
	);
	const dispatch = useDispatch();

	const location = useLocation();

	const checkScreenSize = () => {
		setIsMobile(document.documentElement.clientWidth <= 600);
	};

	useEffect(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		let opt = params.get('opt') || '';
		if (opt === 'show-login') {
			setShowAuthModal(true);
		}
	}, [location.search]);

	useEffect(() => {
		setTimeout(() => {
			if (!localStorage.getItem('sbm-tq-ft')) {
				setIsUserNew(true);
				setShowNewUserModal(true);
				localStorage.setItem('sbm-tq-ft', '1');
			} else {
				setIsUserNew(false);
			}
		}, 1000);
	}, []);

	useEffect(() => {
		handleSpace();
		window.addEventListener('resize', handleSpace);
		return () => window.removeEventListener('resize', handleSpace);
	}, []);

	const handleSpace = () => {
		setEnoughSpace(window.innerWidth > 1311);
	};

	const toggleMenuActivation = () => {
		if (showNewUserModal) setShowNewUserModal(false);
		setShowMenu(!showMenu);
	};

	const handleAuthClick = () => {
		setShowMenu(false);
		setShowAuthModal(true);
	};

	const handleLogoutClick = async () => {
		const res = await Axios.post('/user/logout');
		if (res.data.ok) {
			setShowMenu(false);
			dispatch(getAuthInfoAction());
		}
	};

	return (
		<div
			styleName="container-menu"
			style={{
				paddingRight: `${showMenu ? '27px' : ''}`
			}}
			id="menucito"
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
					{showMenu && (
						<div styleName={`${isAuthenticated ? 'authenticated' : ''}`}>
							<div styleName="sidebar-title">
								<h1>{lang['Title']}</h1>
							</div>
							<div styleName="btn-container">
								<Link to="/">
									<button styleName="sidebar-button">
										<img src={home} alt="home" />
										<span>{lang['HomeOpt']}</span>
									</button>
								</Link>
							</div>
							{!isAuthenticated && (
								<div styleName="btn-container">
									<button styleName="sidebar-button" onClick={handleAuthClick}>
										<img src={account} alt="signin" />
										<span>{lang['SignInOpt']}</span>
									</button>
								</div>
							)}
							{isAuthenticated && (
								<>
									<div styleName="btn-container">
										<Link to="/messages">
											<button styleName="sidebar-button">
												<img src={cloud} alt="cloud" />
												<span>{lang['InboxOpt']}</span>
											</button>
										</Link>
									</div>
									<div styleName="btn-container">
										<button
											styleName="sidebar-button"
											onClick={handleLogoutClick}
										>
											<img
												src={arrowexit}
												alt="logout"
												styleName="logout-icon"
												style={{ padding: '4px' }}
											/>
											<span>{lang['LogOutOpt']}</span>
										</button>
									</div>
								</>
							)}
							<div styleName="footer-container">
								<div styleName="btn-container sbmeek-container">
									<button styleName="sidebar-button sbmeek">
										<img src={tqIcon} alt="tq-fav" />
										<span>SB Meek</span>
									</button>
								</div>
								<a href="/terms" style={{ width: '101.6%' }}>
									<button styleName="btn-terms">{lang['BtnTerms']}</button>
								</a>
							</div>
						</div>
					)}
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
	);
}
