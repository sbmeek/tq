import styled, { css } from 'styled-components';
import { flexCenterColumn } from '../../Root.style';

export const ButtonFlyContainer = styled.div`
	position: absolute;
	top: 0;
	width: 92%;
	height: 70px;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	z-index: 2;

	& > button {
		background: white;
		width: 116px;
		height: 41px;
		display: flex;
		border-radius: 20px;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 5px -0.78px rgba(0, 0, 0, 0.5);
		font-size: 18px;
		cursor: pointer;
	}

	& img {
		width: 20px;
		margin-left: 5px;
	}
`;

export const FirstRow = styled.div`
	position: relative;
	height: 30%;
	min-height: 180px;
	max-height: 181px;
	width: 100%;
	display: flex;
	justify-content: center;
`;

const logoStyle = css`
	& {
		position: absolute;
		height: auto;
		z-index: 1;
	}
`;

export const LogoMax = styled.img`
	${logoStyle}
	top: 20%;
	min-width: 510px;
	max-width: 520px;
	width: 45%;

	@media (max-width: 520px) {
		display: none;
	}
`;

export const LogoMin = styled.img`
	${logoStyle}
	display: none;

	@media (max-width: 520px) {
		display: block;
		top: 23%;
		width: 100%;
		min-width: 492px;
	}

	@media (max-width: 417px) {
		top: 33%;
		width: 100%;
		min-width: 462px;
	}

	@media (max-width: 394px) {
		top: 47%;
		min-width: 400px;
	}

	@media (max-width: 342px) {
		top: 62%;
		min-width: 335px;
	}
`;

export const SecondRow = styled.div`
	position: relative;
	display: flex;
	height: 70%;
	min-height: 422px;
	max-height: 423px;
	width: 100%;
	justify-content: center;
`;

export const Bg = styled.img`
	position: absolute;
	min-width: 113%;
	min-height: 443px;
	max-height: 445px;
`;

export const InnerWrapper = styled.div`
	${flexCenterColumn}
	width: 100%;
	min-width: 390px;
	height: 100%;
	padding-top: 100px;
	z-index: 1;
`;

export const Title = styled.h1`
	color: var(--tq-blue-01);
	font-size: 44px;
	width: 100%;
	text-align: center;
	@media (max-width: 464px) {
		font-size: 38px;
	}
	@media (max-width: 350px) {
		width: 80%;
		font-size: 34px;
	}
`;

export const Paragraph = styled.p`
	width: 50%;
	min-width: 447px;
	text-align: center;
	font-size: 19px;

	@media (max-width: 464px) {
		min-width: 350px;
	}

	@media (max-width: 350px) {
		min-width: 255px;
	}
`;

export const formCustomStyle = css`
	& {
		margin-top: 30px;
	}
`;
