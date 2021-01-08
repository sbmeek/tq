import styled from 'styled-components';

type FormPropsType = {
	isInputMode: boolean;
	formCustomStyle?: CustomStyles;
};

export const Form = styled.form<FormPropsType>`
	${(props) => props.formCustomStyle}
	display: flex;
	position: relative;
	width: 250px;
	color: var(--tq-blue-00);
	border: 5.9px solid
		${(props) =>
			props.isInputMode ? 'var(--tq-blue-05)' : 'var(--tq-blue-01)'};
	background: ${(props) =>
		props.isInputMode ? 'var(--tq-blue-03)' : 'var(--tq-blue-02)'};
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	height: 46px;
	border-radius: 30px;
	transition: background 100ms ease-in, border 100ms ease-in;
	box-sizing: border-box;
	padding: 0 !important;

	&[data-show-submitbtn='true'] {
		margin-right: 27.55px;
	}

	&:hover {
		border: 5.9px solid var(--tq-blue-02);
		background: var(--tq-blue-03);
	}
`;

export const Textarea = styled.textarea<{ isInputMode: boolean }>`
	background: transparent;
	border-radius: 30px;
	width: 100%;
	height: 100%;
	white-space: nowrap;
	overflow: hidden;
	resize: none !important;

	${(props) =>
		props.isInputMode
			? `
			padding: 5px 10px;
			color: #fff;
			font-size: 1.1rem;
			outline: none;
			line-height: 1.5em;
			text-align: left;
			cursor: text;
		`
			: `
			padding: 3px 10px;
			color: var(--tq-blue-00);
			cursor: pointer;
			line-height: 27px;
			text-align: center;
			font-size: 18px;
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
	height: 46px;
	width: 118%;
	border-radius: 30px;
	padding: 0 7px;
	left: -3%;
	top: -5px;
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
		& > img {
			width: 18px;
		}
	}
`;
