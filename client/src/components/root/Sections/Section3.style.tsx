import styled, { css } from 'styled-components';

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

const logoStyle = css`
	& {
		position: absolute;
		z-index: 1;
	}
`;

export const LogoMaxSection3 = styled.img`
	${logoStyle}
	margin-top: 6px;
	width: 800px;

	@media (max-width: 760px) {
		display: none;
	}
`;

export const LogoMinSection3 = styled.img`
	${logoStyle}
	display: none;

	@media (max-width: 760px) {
		display: block;
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
	text-align: center;

	@media (max-width: 410px) {
		font-size: 34px;
	}
	@media (max-width: 334px) {
		font-size: 32px;
	}
`;

export const ParagraphSection3 = styled.p`
	font-size: 19px;
	@media (max-width: 410px) {
		text-align: center;
	}
`;
