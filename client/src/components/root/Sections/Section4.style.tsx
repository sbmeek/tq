import styled from 'styled-components';

export const FirstRowSection4 = styled.div`
	width: 100%;
	height: 105px;
	display: flex;
	justify-content: center;
	z-index: 1;
`;

export const LogoPicSection4 = styled.picture`
	display: flex;
	justify-content: center;
	width: 100%;
`;

export const LogoImgSection4 = styled.img`
	position: absolute;
	width: 540px;
	margin-left: 60px;

	@media (max-width: 592px) {
		margin-left: 30px;
		min-width: 492px;
	}

	@media (max-width: 579px) {
		width: 95%;
		margin-left: 0;
	}

	@media (max-width: 500px) {
		width: 370px;
		min-width: 1px;
	}

	@media (max-width: 390px) {
		width: 320px;
	}

	@media (max-width: 322px) {
		width: 99%;
	}
`;

export const SecondRowSection4 = styled.div`
	width: 100%;
	height: 455px;
	display: flex;
	justify-content: center;
`;

export const Bg4 = styled.img`
	width: 695px;
	position: absolute;

	@media (max-width: 418px) {
		height: 360px;
	}
`;

export const TextWrapperSection4 = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	z-index: 1;
	width: 410px;
	height: 300px;

	@media (max-width: 418px) {
		width: 90%;
	}
`;

export const TitleSection4 = styled.h1`
	font-size: 44px;
	color: var(--tq-blue-01);

	@media (max-width: 418px) {
		font-size: 36px;
		line-height: 0.9;
	}
`;

export const ParagraphSection4 = styled.p`
	font-size: 19px;

	@media (max-width: 418px) {
		margin-top: 18px;
	}
`;
