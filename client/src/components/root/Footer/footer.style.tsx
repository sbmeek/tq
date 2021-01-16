import styled, { css } from 'styled-components';

export const FooterComp = styled.div`
	background-color: var(--tq-bg-01);
	padding-top: 80px;
	min-height: 470px;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 590px) {
		min-height: 630px;
	}
`;

export const InnerContainerFooter = styled.div`
	display: grid;
	grid-template-columns: 2fr repeat(4, 1fr);
	gap: 40px;
	padding: 0 60px;
	width: 100%;
	max-width: 1160px;

	@media (max-width: 820px) {
		height: 100%;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 152px);
		row-gap: 15px;
		place-content: center;
		padding: 0 15px;
	}

	@media (max-width: 590px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const ColumnFooter = styled.div<{ firstColumn?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 1;
	height: 260px;

	@media (max-width: 820px) {
		height: auto;
	}

	${(props) =>
		props.firstColumn
			? css`
					& {
						justify-content: flex-start;
						align-items: flex-start;
						padding-top: 27px;
						@media (max-width: 820px) {
							& {
								flex-direction: row;
								justify-content: space-around;
								grid-column: 1 / -1;
							}
						}
						@media (max-width: 420px) {
							& {
								flex-direction: column;
								align-items: center;
								justify-content: center;
								padding-top: 0;
							}
						}
					}
			  `
			: ''}
`;

export const GroupWrapper = styled.div`
	height: 50%;
	display: flex;
	flex-direction: column;

	@media (max-width: 820px) {
		height: 100%;
	}
	@media (max-width: 590px) {
		height: 100%;
		width: 100%;
		align-items: center;
	}
`;

export const LogoFooterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	& > h1 {
		font-size: 48px;
		color: #fff;
		margin-left: 15px;
	}

	& > img {
		width: 50px;
		height: auto;
	}

	@media (max-width: 420px) {
		& > h1 {
			font-size: 45px;
		}

		& > img {
			width: 45px;
		}
	}
`;

export const GroupTitleFooter = styled.h5`
	font-size: 19px;
	color: var(--tq-blue-03);
	margin-bottom: 12px;

	@media (max-width: 820px) {
		margin-bottom: 0;
	}
`;

export const LinkFooter = styled.span`
	text-decoration: none;
	color: #e3e4e5;
	font-family: NunitoBold;
	margin-top: 15px;

	@media (max-width: 820px) {
		margin-top: 10px;
	}
	@media (max-width: 420px) {
		text-align: center;
	}
`;
