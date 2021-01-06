import styled, { createGlobalStyle, css } from 'styled-components';

export const HideMenucitoStyle = createGlobalStyle`
	#menucito {
		display: none;
	}
`;

export const flexCenterColumn = css`
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

export const Section = styled.div<{ isVisible: boolean }>`
	${flexCenterColumn}
	width: 100%;
	min-width: 256px;
	height: 100%;
	min-height: 605px;
	position: relative;
	transition: transform 500ms, opacity 300ms;
	opacity: ${(props) => (props.isVisible ? 1 : 0)};
	transform: ${(props) =>
		props.isVisible ? 'translateY(0)' : 'translateY(100px)'};

	& a {
		text-decoration: none !important;
	}
`;

export const btnCustomStyle = css<{ section: number | undefined }>`
	& {
		border: 5.9px solid var(--tq-blue-01);
		background-color: var(--tq-blue-02);
		padding: 7px 40px;
		border-radius: 9999px;
		margin-top: 30px;
	}

	${(props) => {
		switch (props.section) {
			case 1:
				return css`
					@media (max-width: 300px) {
						& {
							padding: 7px 10px;
						}
					}
				`;
			case 2:
				return css`
					@media (max-width: 330px) {
						& {
							margin-top: 10px;
						}
					}
					@media (max-width: 290px) {
						& {
							padding: 7px 11px;
						}
					}
				`;
			case 5:
				return css`
					& {
						margin: 0;
					}
				`;
			default:
				return;
		}
	}}
`;

export const Footer = styled.div`
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

export const LangToggler = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40px;

	& > span {
		margin-right: 10px;
		color: #fff;
	}

	@media (max-width: 420px) {
		margin-top: 25px;
	}
`;

export const FlagLangToggler = styled.img`
	width: 37px;
	margin-right: 10px;
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
