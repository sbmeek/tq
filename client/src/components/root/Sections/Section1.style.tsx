import styled from 'styled-components';
import logoMin from 'assets/images/presentation/logo_min_section1.svg';
import { flexCenterColumn } from '../Root.style';

export const FirstRowSection1 = styled.div`
	position: relative;
	height: 30%;
	min-height: 180px;
	max-height: 181px;
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const LogoSection1 = styled.img`
	position: absolute;
	top: 20%;
	min-width: 510px;
	max-width: 520px;
	width: 45%;
	height: auto;
	z-index: 1;

	@media (max-width: 520px) {
		top: 23%;
		width: 100%;
		min-width: 492px;
		content: url(${logoMin});
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

export const SecondRowSection1 = styled.div`
	position: relative;
	display: flex;
	height: 70%;
	min-height: 422px;
	max-height: 423px;
	width: 100%;
	justify-content: center;
`;

export const Bg1 = styled.img`
	position: absolute;
	min-width: 113%;
	min-height: 443px;
	max-height: 445px;
`;

export const InnerWrapperSection1 = styled.div`
	${flexCenterColumn}
	width: 100%;
	min-width: 390px;
	height: 100%;
	padding-top: 100px;
	z-index: 1;
`;

export const TitleSection1 = styled.h1`
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

export const ParagraphSection1 = styled.p`
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
