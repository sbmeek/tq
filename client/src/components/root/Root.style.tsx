import styled, { createGlobalStyle, css } from 'styled-components';
import logoMin from 'assets/images/presentation/imalogo_min.svg';

export const HideMenucitoStyle = createGlobalStyle`
	#menucito {
		display: none;
	}
`;

const flexCenterColumn = css`
	& {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
	min-width: 100%;
	height: 100%;
`;

export const Section = styled.div`
	${flexCenterColumn}
	min-width: 100%;
	min-height: 100%;
`;

export const FirstRow = styled.div`
	position: relative;
	height: 30%;
	min-height: 180px;
	max-height: 181px;
	width: 100%;
	display: flex;
	justify-content: center;

	& > .logo1 {
		position: absolute;
		top: 20%;
		min-width: 510px;
		max-width: 520px;
		width: 45%;
		height: auto;
		z-index: 1;
	}

	@media (max-width: 520px) {
		& > .logo1 {
			top: 23%;
			width: 100%;
			min-width: 492px;
			content: url(${logoMin});
		}
	}
	@media (max-width: 417px) {
		& > .logo1 {
			top: 33%;
			width: 100%;
			min-width: 462px;
		}
	}
	@media (max-width: 394px) {
		& > .logo1 {
			top: 47%;
			min-width: 400px;
		}
	}
	@media (max-width: 342px) {
		& > .logo1 {
			top: 62%;
			min-width: 335px;
		}
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

	& > .bg1 {
		position: absolute;
		min-width: 113%;
		min-height: 443px;
		max-height: 445px;
	}
`;

export const InnerWrapper = styled.div`
	${flexCenterColumn}
	width: 100%;
	min-width: 390px;
	height: 100%;
	padding-top: 100px;
	z-index: 1;

	& > h1 {
		color: var(--tq-blue-01);
		font-size: 48px;
		width: 100%;
		text-align: center;
	}

	& > span {
		width: 50%;
		min-width: 447px;
		text-align: center;
		font-size: 19px;
	}

	& > a {
		text-decoration: none !important;
	}

	@media (max-width: 464px) {
		& > h1 {
			font-size: 38px;
		}
		& > span {
			min-width: 350px;
		}
	}

	@media (max-width: 350px) {
		& > h1 {
			width: 80%;
		}
		& > span {
			min-width: 255px;
		}
	}
`;

export const btnCustomStyle = css`
	& {
		border: 5.9px solid var(--tq-blue-01);
		background-color: var(--tq-blue-02);
		padding: 7px 40px;
		border-radius: 9999px;
		margin-top: 30px;
	}

	@media (max-width: 300px) {
		& {
			padding: 7px 10px;
		}
	}
`;
