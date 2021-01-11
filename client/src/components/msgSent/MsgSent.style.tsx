import styled, { css } from 'styled-components';
import { linkStyles } from 'shared/link/Link.style';
import { Link } from 'react-router-dom';

const flexCenter = css`
	& {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const Container = styled.div`
	${flexCenter}
	flex-direction: column;
	min-height: 100%;
`;

export const Wrapper = styled.div`
	${flexCenter}
	flex-direction: column;
	width: 90%;
	max-width: 450px;
	height: 210px;
	background: #3b3b3b;
	border-radius: 46px;
	position: relative;
	@media (max-width: 380px) {
		width: 99%;
	}
`;

export const LogoContainer = styled.div`
	${flexCenter}
	flex-direction: column;
	position: absolute;
	bottom: 70%;
	width: 100%;
	&::after {
		content: '';
		background-color: #c3c3c321;
		max-width: 141px;
		width: 50%;
		height: 9px;
		margin-top: 5px;
		border-radius: 50%;
	}
`;

export const Logo = styled.img`
	width: 357px;
	height: auto;
	z-index: 3;
	@media (max-width: 338px) {
		width: 100%;
	}
`;

export const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 50px;
`;

export const H3 = styled.h3`
	font-family: NunitoBold;
	font-size: 35px;
	margin-bottom: 9px;
	color: #fff;
	line-height: 1;
	text-align: center;
	@media (max-width: 437px) {
		font-size: 9vw;
	}
`;

export const LinkSendAgain = styled.span`
	${linkStyles}
	color: var(--tq-blue-02) !important;
	&:hover {
		color: var(--tq-blue-03) !important;
	}
	margin: 3px;
`;

export const LinkHome = styled(Link)`
	& {
		margin-top: 22px;
		text-decoration: none;
		color: #fff;
	}
`;

export const btnCustomStyle = css`
	& {
		height: 42px;
		width: 114px;
		font-size: 22px;
		font-family: NunitoBold;
	}
	& > img {
		width: 33px;
	}
`;
