import styled, { css } from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100%;
`;

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 250px;
	min-height: 360px;
	height: 74vh;
	z-index: 2;
`;

export const LogoContainer = styled.div`
	position: relative;
	height: 26%;
	display: flex;
	align-items: flex-end;
`;

export const TQLogo = styled.img<{ isLogoLoaded: boolean }>`
	position: relative;
	max-width: 500px;
	max-height: 400px;
	width: 100%;
	margin-bottom: 25px;
	margin-top: -90px;
	transition: opacity 250ms;
	transform: scale(1);
	opacity: ${(props) => (props.isLogoLoaded ? 1 : 0)};
`;

export const MainElementsContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	z-index: -2;
`;

export const FieldTQ = styled.div<{ isFieldLoaded: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	max-width: 300px;
	min-width: 300px;
	width: 70%;
	opacity: ${(props) => (props.isFieldLoaded ? 1 : 0.6)};
	transition: opacity 200ms;

	& > div {
		max-width: 100%;
	}

	@media (max-width: 420px) {
		width: 100%;
		align-items: flex-start;
	}

	@media (max-width: 300px) {
		min-width: 250px;
	}
`;

export const FirstFieldRow = styled.div<{
	isInputMode: boolean;
	shouldShowSubmitBtn: boolean;
}>`
	display: flex;
	position: relative;
	width: 100%;
	min-width: 250px;
	color: var(--tq-blue-00);
	border: 5.9px solid
		${(props) =>
			props.isInputMode ? 'var(--tq-blue-05)' : 'var(--tq-blue-01)'};
	background: ${(props) =>
		props.isInputMode ? 'var(--tq-blue-03)' : 'var(--tq-blue-02)'};
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	height: 42px;
	border-radius: 30px;
	transition: background 100ms ease-in, border 100ms ease-in;
	box-sizing: border-box;
	padding: 0 !important;
	box-shadow: ${(props) =>
		props.shouldShowSubmitBtn
			? 'none'
			: '0px 3.2px 0px 2.2px var(--tq-blue-00)'};
	&:hover {
		border: 5.9px solid var(--tq-blue-02);
		background: var(--tq-blue-03);
	}
	@media (max-width: 420px) {
		&[data-show-submitbtn='true'] {
			width: 90%;
		}
	}
	@media (max-width: 290px) {
		&[data-show-submitbtn='true'] {
			width: 88%;
		}
	}
`;

export const SecondFieldRow = styled.div`
	margin-top: 15px;
	max-width: 302px;
	min-width: 250px;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

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
	box-shadow: 0px 5.4px var(--tq-blue-00);
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

export const btnCustomStyle = css`
	height: 37px;
	min-width: 47%;
`;
