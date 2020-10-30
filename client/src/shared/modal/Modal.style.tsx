import styled, { css, keyframes } from 'styled-components';

export type CustomType = {
	props?: React.HTMLAttributes<HTMLDivElement> & { [key: string]: any };
	customStyles?: CustomStyles;
};

export type IsActiveType = {
	isActive: boolean;
};

const flexCenter = css`
	& {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const enableOverlay = keyframes`
	0% {
		opacity: 0;
	}
	10% {
		z-index: 34;
	}
	100% {
		opacity: 1;
	}
`;

export const Overlay = styled.div<IsActiveType & CustomType>`
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
	${(props) => props.customStyles}
`;

export const Wrapper = styled.div<CustomType>`
	height: 100%;
	width: 100vw;
	${flexCenter}
	position: fixed;
	top: 0;
	left: 0;
	z-index: 35;
	pointer-events: none;
	${(props) => props.customStyles}
`;

const enlarge = keyframes`
	0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1.02);
	}
`;

const shrink = keyframes`
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(.902);
	}
	100% {
		opacity: 0;
	}
`;

export const Container = styled.div<IsActiveType & CustomType>`
	${flexCenter}
	flex-direction: column;
	background: #fff;
	width: fit-content;
	height: fit-content;
	color: #1b1b1b;
	border-radius: 20px;
	padding: 20px 40px;
	overflow: hidden;
	z-index: 35;
	pointer-events: all;
	${(props) =>
		props.isActive
			? css`
					& {
						transform: scale(1);
						animation: ${enlarge} 150ms;
					}
			  `
			: css`
					& {
						transform: scale(0);
						animation: ${shrink} 150ms;
					}
			  `}
	${(props) => props.customStyles}
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

type InnerContainerPropsType = { toggleContentAnim?: boolean } & CustomType;

export const InnerContainer = styled.div<InnerContainerPropsType>`
	${flexCenter}
	flex-direction: column;
	transition: transform 150ms;
	animation: ${(props) =>
		props.toggleContentAnim
			? css`
					${contentChange} 220ms
			  `
			: ''};
	${(props) => props.customStyles}
`;
