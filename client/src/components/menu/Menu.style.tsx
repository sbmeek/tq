import styled, { css, keyframes } from 'styled-components';

type ShowMenuType = { showMenu: boolean };

export const Container = styled.div<ShowMenuType>`
	display: flex;
	justify-content: flex-end;
	position: fixed;
	left: 0;
	transition: opacity 2s linear;
	z-index: 16;
	width: 100%;
	height: 0.1px;
	padding-right: ${(props) => (props.showMenu ? '27px' : '')};
`;

export const Overlay = styled.div<{ showOverlay: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	min-height: ${(props) => (props.showOverlay ? '100%' : '0')};
	z-index: ${(props) => (props.showOverlay ? '15' : '-90')};
	opacity: ${(props) => (props.showOverlay ? '1' : '0')};
	min-width: 100vw;
	background: rgba(0, 0, 0, 0.5);
	transform: translateZ(0);
	transition: height 200ms, opacity 200ms;
`;

export const Wrapper = styled.div`
	z-index: 16;
	margin-top: 20px;
`;

export const BtnMenu = styled.button<ShowMenuType>`
	display: flex;
	justify-content: flex-end;
	background: transparent;
	outline: none;
	border: none;
	transform: ${(props) => (props.showMenu ? 'translateX(-150px)' : '')};
	transition: transform 600ms cubic-bezier(0.77, 0, 0.175, 1);
	& > img {
		user-select: none;
	}
	&:hover > img:nth-child(2) {
		transform: scale(1.1);
	}
	&:focus {
		transition: transform 400ms ease-out;
	}
`;

export const ArrowIcon = styled.img<ShowMenuType>`
	width: 25px;
	height: 25px;
	margin: 11px -20.8px 0 0;
	cursor: pointer;
	transition: transform 500ms;
	transform: ${(props) =>
		props.showMenu ? 'translateX(64px) rotate(180deg)' : ''};
	@media (max-width: 600px) {
		width: 19px;
		height: 19px;
		margin-right: ${(props) => (props.showMenu ? '-9px' : '-18.8px')};
		transform: ${(props) =>
			props.showMenu ? 'translateX(52px) rotate(180deg)' : ''};
	}
`;

const rotate = keyframes`
	0% {
		transform: rotate(-15deg);
	}
	100% {
		transform: rotate(0);
	}
`;

export const TBombIcon = styled.img<ShowMenuType>`
	min-width: 83px;
	min-height: 83px;
	cursor: pointer;
	transition: transform 600ms;
	&:active {
		transition: transform 400ms ease-out;
	}
	@media (max-width: 600px) {
		min-width: 63px;
		min-height: 63px;
	}
	${(props) =>
		props.showMenu
			? css`
					animation: ${rotate} 800ms;
			  `
			: ''};
`;

export const Sidebar = styled.div<ShowMenuType & { isAuthenticated: boolean }>`
	position: fixed;
	top: 0;
	background: white;
	height: 100%;
	max-height: 100%;
	min-height: 496px;
	width: 255px;
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
	border-radius: 21px 0px 0px 100px;
	opacity: ${(props) => (props.showMenu ? 1 : 0)};
	transform: ${(props) =>
		props.showMenu ? 'translateX(calc(115px - 255px))' : 'translateX(65%)'};
	transition: opacity 250ms, transform 250ms;
	z-index: -1;
	& > div {
		display: grid;
		grid-template-rows: ${(props) =>
			`minmax(90px, 110px) repeat(${
				props.isAuthenticated ? '3' : '2'
			}, minmax(40px, 60px)) 5fr`};
		max-width: 100%;
		height: 100%;
	}
`;

export const SidebarTitle = styled.div`
	position: relative;
	display: flex;
	color: var(--tq-red-03);
	justify-content: center;
	align-items: center;
	padding-left: 26%;
	cursor: default;
	& > h1 {
		position: absolute;
		top: 22px;
		font-size: 58px;
	}
	@media (max-width: 600px) {
		padding-left: 15%;
		& > h1 {
			top: 18px;
		}
	}
`;

const FlexEnd = css`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
`;

export const ButtonContainer = styled.div`
	${FlexEnd}
	& > a {
		text-decoration: none;
		display: contents;
	}
`;

export const SidebarButton = styled.button<{ SBMeekButton?: boolean }>`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: transparent;
	border-radius: 200px 0px 0px 200px;
	transition: background 250ms;
	height: 100%;
	width: 100%;
	color: var(--tq-red-01);
	font-size: 1.7em;
	cursor: pointer;
	&:hover {
		background: rgba(78, 78, 78, 0.16);
	}
	&:active {
		background: rgba(78, 78, 78, 0.3);
	}
	&:hover > img {
		transform: scale(1.1);
	}
	&:hover > i {
		transform: scale(1.1);
		transition: transform 170ms;
	}
	${(props) =>
		props.SBMeekButton
			? css`
					width: 100%;
					height: 30%;
					background: transparent !important;
					cursor: default;
					& > img {
						filter: drop-shadow(0px 0px 1px black);
						transform: scale(1) !important;
					}
			  `
			: ''}
`;

export const ButtonIcon = styled.img<{ isLogoutIcon?: boolean }>`
	transition: transform 170ms;
	width: 36px;
	${(props) =>
		props.isLogoutIcon
			? css`
					background: var(--tq-red-03);
					border-radius: 9999px;
					padding: 3px;
			  `
			: ''}
`;

export const ButtonText = styled.span`
	width: 60%;
	text-align: center;
	font-size: 30px;
`;

export const FooterContainer = styled.div`
	width: 252px;
	height: 100%;
	${FlexEnd}
	flex-direction: column;
`;

export const SBMeekWrapper = styled.div`
	height: 70%;
	width: 100%;
	max-height: 238px;
	${FlexEnd}
`;

export const ButtonTerms = styled.button`
	width: 100%;
	height: 114px;
	border-radius: 30px 0px 0px 240px;
	background: var(--tq-red-03) 0% 0% no-repeat padding-box;
	color: #fff;
	font-size: 25px;
	cursor: pointer;
`;
