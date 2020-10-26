import styled, { css } from 'styled-components';

export const Container = styled.div`
	width: 100%;
	padding-bottom: 10px;
	min-height: 100%;
`;

export const InnerContainer = styled.div`
	margin-top: 75px;
`;

export const Column = styled.div<{ margin?: string }>`
	position: relative;
	display: flex;
	justify-content: center;
	padding: 0 !important;
	margin: ${(props) => props.margin};
	& > div {
		position: relative;
	}
	& > a {
		text-decoration: none;
	}
`;

export const UserLinkInput = styled.input`
	position: absolute;
	left: -999em;
`;

export const btnCustomStyle = css`
	min-height: 55px;
	border-radius: 9999px !important;
	width: 100px;
`;

export const BtnHelp = styled.button<{ isVisible: boolean }>`
	position: absolute;
	top: 0;
	left: 99.5%;
	border-radius: 30px;
	min-width: 20px;
	min-height: 20px;
	font-weight: 800;
	font-size: 14px;
	background: rgba(0, 0, 0, 0.2);
	color: #fff;
	cursor: pointer;
	transition: background 180ms;
	visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
	&:hover {
		background: rgba(0, 0, 0, 0.5);
	}
`;

export const btnCopyLinkCustomStyle = css<{ showCopiedLinkMsg?: boolean }>`
	& {
		box-shadow: 0px 6.4px var(--tq-blue-00);
		background: var(--tq-blue-02);
		border: 5.9px solid var(--tq-blue-01);
		color: var(--tq-blue-00);
		border-radius: 9999px;
		min-width: ${(props) => (props.showCopiedLinkMsg ? '300px' : '250px')};
		min-height: 50px;
		font-size: 22.5px;
		margin-bottom: 10px;
		& > img {
			width: 33px !important;
		}
	}
`;
