import styled, { css } from 'styled-components';
import logoMinSection3 from 'assets/images/presentation/logo_min_section3.png';

const gridCenter = css`
	& {
		display: grid;
		place-items: center;
	}
`;

export const FirstRowSection3 = styled.div`
	${gridCenter}
	height: 280px;
	width: 100%;
	position: relative;
	@media (max-width: 390px) {
		height: 140px;
	}
`;

export const LogoSection3 = styled.img`
	position: absolute;
	width: 800px;
	z-index: 1;
	margin-top: 6px;
	@media (max-width: 760px) {
		content: url(${logoMinSection3});
		width: 380px;
	}
	@media (max-width: 390px) {
		width: 310px;
		margin-top: 55px;
	}
	@media (max-width: 320px) {
		width: 265px;
		margin-top: 75px;
	}
`;

export const SecondRowSection3 = styled.div`
	${gridCenter}
	height: 120px;
	width: 100%;
	position: relative;
	@media (max-width: 390px) {
		height: 250px;
	}
`;

export const Bg3 = styled.img`
	width: 109%;
	min-width: 918px;
	height: 272px;
	position: absolute;
`;

export const TextWrapperSection3 = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	z-index: 1;
	margin-top: 31px;
	@media (max-width: 301px) {
		margin-top: 51px;
	}
`;

export const TitleSection3 = styled.h1`
	font-size: 44px;
	color: var(--tq-blue-01);

	@media (max-width: 410px) {
		font-size: 36px;
	}
	@media (max-width: 334px) {
		font-size: 32px;
		text-align: center;
	}
`;

export const ParagraphSection3 = styled.p`
	font-size: 19px;
	@media (max-width: 410px) {
		text-align: center;
	}
`;
