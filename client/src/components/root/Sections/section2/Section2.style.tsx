import styled, { css } from 'styled-components';

export const FirstRow = styled.div`
	display: grid;
	place-items: center;
	position: relative;
	width: 100%;
	height: 200px;
	z-index: 1;
`;

export const Logo = styled.img`
	margin-left: 297px;
	margin-top: 44px;
	height: auto;
	width: 221px;
	@media (max-width: 535px) {
		position: absolute;
		margin: 0;
		top: 30%;
		right: 0;
		width: 190px;
	}
	@media (max-width: 390px) {
		top: 35%;
	}
	@media (max-width: 290px) {
		top: 42%;
		width: 170px;
	}
	@media (max-width: 280px) {
		top: 45%;
		width: 160px;
	}
`;

export const SecondRow = styled.div`
	display: grid;
	place-items: center;
	position: relative;
	width: 100%;
	height: 260px;
`;

export const Bg = styled.img`
	position: absolute;
	width: 102.59%;
	min-width: 867px;
	max-width: 869px;
	@media (max-width: 535px) {
		right: -35%;
	}
	@media (max-width: 390px) {
		right: -55%;
	}
	@media (max-width: 290px) {
		right: -88%;
	}
`;

export const InnerWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	flex-direction: column;
	width: 531px;
	z-index: 1;
	margin-top: 50px;
	@media (max-width: 555px) {
		width: 98%;
	}
	@media (max-width: 445px) {
		align-items: center;
	}
	@media (max-width: 290px) {
		margin-top: 38px;
	}
`;

export const Title = styled.h1`
	font-size: 44px;
	color: var(--tq-blue-01);
	@media (max-width: 391px) {
		font-size: 38px;
	}
	@media (max-width: 345px) {
		font-size: 32px;
	}
	@media (max-width: 290px) {
		text-align: center;
	}
`;

export const Paragraph = styled.p`
	font-size: 19px;
	text-align: right;
	@media (max-width: 445px) {
		text-align: center;
	}
`;

export const formCustomStyle = css`
	& {
		margin-top: 30px;
	}
`;
