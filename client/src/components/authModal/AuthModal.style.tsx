import { linkStyles } from 'shared/link/Link.style';
import styled, { css, keyframes } from 'styled-components';

type ActiveType = {
	isActive: boolean;
};

const flexCenter = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const enableOverlay = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

export const Overlay = styled.div<ActiveType>`
	${flexCenter}
	position: fixed;
	top: 0;
	left: 0;
	${(props) =>
		props.isActive
			? css`
					 {
						z-index: 34;
						opacity: 1;
						height: 100%;
						animation: ${enableOverlay} 300ms;
					}
			  `
			: css`
					 {
						z-index: -34;
						opacity: 0;
						height: 0;
					}
			  `}
	width: 100vw;
	background: rgba(0, 0, 0, 0.8);
	@media (max-width: 600px) {
		background: rgba(255, 255, 255, 0.94);
	}
`;

export const Wrapper = styled.div`
	height: 100%;
	width: 100vw;
	${flexCenter}
	position: fixed;
	top: 0;
	left: 0;
	z-index: 35;
	pointer-events: none;
`;

const enlarge = keyframes`
0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1.02);
	}
`;

export const Container = styled.div<ActiveType & { showLogin: boolean }>`
	display: flex;
	flex-direction: column;
	background: #fff;
	width: 600px;
	height: ${(props) => (props.showLogin ? '376px' : '556px')};
	color: #1b1b1b;
	border-radius: 20px;
	padding: 20px 40px 0 40px;
	overflow: hidden;
	transition: height 250ms;
	z-index: 35;
	pointer-events: all;
	${(props) =>
		props.isActive
			? css`
					 {
						justify-content: unset;
						align-items: center;
						transform: scale(1);
						animation: ${enlarge} 150ms;
					}
			  `
			: ''}
	@media (max-width: 600px) {
		width: 100%;
		height: 100% !important;
		border-radius: 0;
		padding: 20px;
		overflow: auto;
		pointer-events: all;
		position: relative;
		background-color: transparent;
		&[aria-labelledby='login-container'] {
			justify-content: center !important;
		}
	}
	@media (max-width: 296px) {
		padding: 1px;
	}
`;

const contentChange = keyframes`
	0% {
		transform: scale(0.9);
	}
	90% {
		transform: scale(1.01);
	}
	100% {
		transform: scale(1);
	}
`;

export const InnerContainer = styled.div<{ toggleContentAnim: boolean }>`
	${flexCenter}
	flex-direction: column;
	transition: transform 150ms;
	animation: ${(props) =>
		props.toggleContentAnim
			? css`
					${contentChange} 220ms
			  `
			: ''};
	@media (max-width: 600px) {
		max-width: 420px;
	}
`;

export const Title = styled.h1`
	font-size: 31px;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 600px) {
		display: inline-block;
		width: 100%;
		margin: 0;
		margin-bottom: 8px;
		text-align: center;
		font-size: 2em;
		& > small {
			display: none;
		}
		&[aria-labelledby='signup-title'] {
			font-size: 1.7em;
			margin-bottom: 1px !important;
		}
	}
`;

interface ITogglerContainerProps {
	isMobile: boolean;
	showLogin: boolean;
}

export const TogglerContainer = styled.span<ITogglerContainerProps>`
	color: var(--tq-gray-02);
	display: flex;
	font-size: 16px;
	margin-top: ${(props) =>
		!props.isMobile && props.showLogin
			? '20px'
			: !props.isMobile && !props.showLogin
			? '10px'
			: '0'};
`;

export const Toggler = styled.span`
	${linkStyles}
`;

export const FormWrapper = styled.div`
	display: flex;
	@media (max-width: 600px) {
		flex-direction: column;
		max-width: 100%;
	}
`;

export const FormInnerWrapper = styled.div`
	display: flex;
	align-items: center;
	@media (max-width: 600px) {
		display: block;
	}
`;

export const Separator = styled.div`
	${flexCenter}
	flex-direction: column;
	& > span {
		font-size: 16px;
	}

	& > hr {
		width: 2px;
		background: var(--tq-gray-03);
		height: 103px;
	}

	@media (max-width: 600px) {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		width: 100%;
		margin-bottom: -8px;

		& > hr {
			height: 1px;
			width: 50%;
		}

		& > span {
			margin: 0 10px;
		}
	}
`;

export const BtnOAuthContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 5px;
	position: relative;
	&::after {
		content: '';
		background-color: var(--tq-gray-03);
		width: 155px;
		height: 9px;
		border-radius: 50%;
		position: absolute;
		top: 125%;
		left: 35px;
	}
	@media (max-width: 600px) {
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
		margin: 15px 0;

		& > button {
			width: 47%;
			max-width: 180px;
		}

		& > button > span {
			width: 80%;
		}

		& > * > * {
			font-size: 0.8rem;
		}

		&::after {
			display: none;
		}
	}
	@media (max-width: 382px) {
		flex-direction: column;

		& > button {
			width: 100%;
			min-width: 195px;
		}
	}
`;

const oAuthGoogle = css`
	background: var(--tq-red-03);

	&:hover {
		background: #de1f24;
	}

	& > img {
		transform: translateX(-42%);
		height: 28px;
	}
	@media (max-width: 600px) {
		margin: 0;
	}
`;

const oAuthFB = css`
	background: var(--tq-blue-00);

	&:hover {
		background: #0a5aa1;
	}

	& > img {
		transform: translateX(-42%);
		height: 31px;
	}
`;

interface IButtonOAuthProps {
	fbBtn?: boolean;
	googleBtn?: boolean;
}

export const ButtonOAuth = styled.button<IButtonOAuthProps>`
	display: flex;
	align-items: center;
	width: 188px;
	height: 42px;
	color: #fff;
	border-radius: 8px;
	margin: 10px;
	transition: transform 100ms, background 150ms, opacity 150ms;
	overflow: hidden;
	position: relative;

	${(props) => (props.fbBtn ? oAuthFB : props.googleBtn ? oAuthGoogle : '')}

	& > span {
		display: flex;
		align-items: center;
		transition: transform 150ms ease-out, opacity 200ms;
		font-size: 14px;
		position: absolute;
		left: 16%;
	}

	&:hover > span {
		transform: translateX(190px);
	}

	& > span > hr {
		width: 1px;
		background: #ffffff;
		height: 30px;
		margin-right: 9px;
	}

	& > img {
		position: absolute;
		transition: transform 150ms ease-out, opacity 200ms;
		width: 100%;
		bottom: 15%;
	}

	&:hover > img {
		margin: 0;
		transform: translateX(0%);
	}
`;
