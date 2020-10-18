import styled from 'styled-components';

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

export const BtnCopyLink = styled.button`
	font-family: 'Nunito', sans-serif;
	display: flex;
	text-transform: none;
	box-shadow: 0px 6.4px var(--tq-blue-00);
	border-radius: 30px;
	background: var(--tq-blue-02);
	min-width: 250px;
	min-height: 50px;
	border: 5.9px solid var(--tq-blue-01);
	font-size: 22.5px;
	transition: ease-in-out 0.22s;
	margin-bottom: 10px;
	color: var(--tq-blue-00);
	padding: 6px 23px;
	cursor: pointer;
	overflow: hidden;
	position: relative;
	justify-content: center;
	&:hover {
		border: 5.9px solid var(--tq-blue-02);
		background: var(--tq-blue-03);
	}
	& > img {
		position: absolute;
		transition: transform 150ms ease-out, opacity 200ms;
		opacity: 0;
		width: 33px;
	}
	&:hover > img {
		transform: translateX(0);
		opacity: 1;
	}
	& > span {
		display: block;
		transition: transform 150ms ease-out;
	}
	&:hover > span {
		transform: translateX(230px);
	}
`;
