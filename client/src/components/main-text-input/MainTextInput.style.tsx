import styled from 'styled-components';

export const Textarea = styled.textarea<{ isInputMode: boolean }>`
	padding: 3px 10px;
	background: transparent;
	border-radius: 30px;
	min-height: 100%;
	min-width: 250px;
	width: 100%;
	max-height: 42px;
	white-space: nowrap;
	overflow: hidden;
	resize: none !important;
	${(props) =>
		props.isInputMode
			? `
			color: #fff;
			font-size: 1.1rem;
			outline: none;
			line-height: 1.5em;
			text-align: left;
			cursor: text;
		`
			: `
			color: var(--tq-blue-00);
			cursor: pointer;
			line-height: 27px;
			text-align: center;
		`}
	&::placeholder {
		display: flex;
		align-items: center;
		color: var(--tq-blue-00) !important;
	}
`;

export const MainBtn = styled.button`
	position: absolute;
	background: var(--tq-blue-01);
	color: #fff;
	min-height: 100%;
	min-width: 116%;
	border-radius: 30px;
	padding: 0 7px;
	left: -3%;
	top: -5px;
	height: 41px;
	z-index: -1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	cursor: pointer;
	& > img {
		width: 20px;
		height: auto;
	}
	@media (max-width: 420px) {
		min-width: 117%;
		& > img {
			width: 18px;
		}
	}

	@media (max-width: 290px) {
		min-width: 120%;
	}
`;
