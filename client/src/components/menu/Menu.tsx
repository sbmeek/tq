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
import { InitContext } from 'global/context/InitContext';

import {
	ArrowIcon,
	BtnMenu,
	Container,
	Overlay,
	Sidebar,
	ButtonContainer,
	SidebarButton,
	SidebarTitle,
	TBombIcon,
	Wrapper,
	ButtonIcon,
	ButtonText,
	FooterContainer,
	SBMeekWrapper,
	ButtonTerms
} from './Menu.style';

export default function Menu() {
	const [isUserNew, setIsUserNew] = useState(true);
	const [showNewUserModal, setShowNewUserModal] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [shouldShowOverlay, setShouldShowOverlay] = useState(false);
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
		setShouldShowOverlay(window.innerWidth < 1311);
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
		<Container showMenu={showMenu} id="menucito">
			<Overlay
				showOverlay={showMenu && shouldShowOverlay}
				onClick={toggleMenuActivation}
				onTouchStartCapture={toggleMenuActivation}
			/>
			<Wrapper>
				<BtnMenu onClick={toggleMenuActivation} showMenu={showMenu}>
					<ArrowIcon showMenu={showMenu} src={flecha} alt="arrow" />
					<TBombIcon showMenu={showMenu} src={menulog} alt="t-bomb" />
				</BtnMenu>
				<Sidebar showMenu={showMenu} isAuthenticated={isAuthenticated}>
					{showMenu && (
						<div>
							<SidebarTitle>
								<h1>{lang['Title']}</h1>
							</SidebarTitle>
							<ButtonContainer>
								<Link to="/">
									<SidebarButton>
										<ButtonIcon src={home} alt="home" />
										<ButtonText>{lang['HomeOpt']}</ButtonText>
									</SidebarButton>
								</Link>
							</ButtonContainer>
							{!isAuthenticated && (
								<ButtonContainer>
									<SidebarButton onClick={handleAuthClick}>
										<ButtonIcon src={account} alt="signin" />
										<ButtonText>{lang['SignInOpt']}</ButtonText>
									</SidebarButton>
								</ButtonContainer>
							)}
							{isAuthenticated && (
								<>
									<ButtonContainer>
										<Link to="/messages">
											<SidebarButton>
												<ButtonIcon src={cloud} alt="cloud" />
												<ButtonText>{lang['InboxOpt']}</ButtonText>
											</SidebarButton>
										</Link>
									</ButtonContainer>
									<ButtonContainer>
										<SidebarButton onClick={handleLogoutClick}>
											<ButtonIcon
												src={arrowexit}
												alt="logout"
												style={{ padding: '4px' }}
												isLogoutIcon
											/>
											<ButtonText>{lang['LogOutOpt']}</ButtonText>
										</SidebarButton>
									</ButtonContainer>
								</>
							)}
							<FooterContainer>
								<SBMeekWrapper>
									<SidebarButton SBMeekButton>
										<ButtonIcon src={tqIcon} alt="tq-fav" />
										<ButtonText>SB Meek</ButtonText>
									</SidebarButton>
								</SBMeekWrapper>
								<a href="/terms" style={{ width: '101.6%' }}>
									<ButtonTerms>{lang['BtnTerms']}</ButtonTerms>
								</a>
							</FooterContainer>
						</div>
					)}
				</Sidebar>
			</Wrapper>
			{isUserNew && <FirstTimeHelpBox active={showNewUserModal} />}
			<AuthModal
				opened={showAuthModal}
				setOpened={setShowAuthModal}
				setShowMenu={setShowMenu}
				isMobile={isMobile}
			/>
		</Container>
	);
}
