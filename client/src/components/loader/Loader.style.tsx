import styled, { keyframes } from 'styled-components';

export const LoaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	vertical-align: middle;
	position: fixed;
	min-width: 100vw;
	min-height: 100%;
	background-color: #fff;
	z-index: 9999;
`;

const loaderEyeAnim = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(-360deg);
	}
`;

export const LoaderEyeSvg = styled.svg`
	margin: 0 auto;
	animation: ${loaderEyeAnim} 730ms linear 50ms infinite;
	width: 30%;
	height: 30%;
`;
