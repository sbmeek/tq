import styled, { css } from 'styled-components';

export const LogoPic = styled.picture`
	width: 100%;
	height: 350px;
	display: flex;
	justify-content: center;
	z-index: 1;
`;

export const LogoImg = styled.img`
	position: absolute;
	width: 630px;
	margin-top: 37px;

	@media (max-width: 590px) {
		width: 560px;
		margin-top: 47px;
	}

	@media (max-width: 500px) {
		width: 470px;
		margin-top: 86px;
	}

	@media (max-width: 425px) {
		width: 400px;
		margin-top: 113px;
	}

	@media (max-width: 365px) {
		width: 335px;
		margin-top: 140px;
	}
`;

export const InnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100%;
	height: 505px;
`;

export const Bg = styled.img`
	min-width: 1444px;
	width: 145%;
	height: 813px;
	position: absolute;
	z-index: -1;

	@media (max-width: 590px) {
		height: 830px;
	}
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 130px;
	width: 600px;

	& > a {
		margin: 30px auto;
	}

	@media (max-width: 590px) {
		width: 95%;
		height: 210px;
	}

	@media (max-width: 425px) {
		height: 230px;
	}

	@media (max-width: 365px) {
		height: 250px;
	}
`;

export const Title = styled.h1`
	font-size: 44px;
	color: var(--tq-blue-01);
	text-align: center;
	line-height: 1.1;

	@media (max-width: 455px) {
		font-size: 40px;
	}

	@media (max-width: 310px) {
		font-size: 36px;
	}
`;

export const formCustomStyle = css`
	& {
		margin-top: 25px;
	}
`;
