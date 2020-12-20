import styled, { css, keyframes } from 'styled-components';
import { inputStyles } from '../style';

export const FieldsContainer = styled.div`
	width: 320px;
	height: 174px;
	@media (max-width: 600px) {
		height: 178px;
		width: 100%;
	}
`;

export const Label = styled.label`
	padding-left: 21px;
	font-size: 16px;
	height: 83px;
`;

export const Input = styled.input`
	${inputStyles}
	@media (max-width: 600px) {
		width: 100%;
	}
`;

const showErrMsgAnim = keyframes`{
	0%{ opacity: 0; }
	100%{ opacity: 1; }
}`;

export const ErrMsg = styled.span<{ toggleErrMsg: boolean }>`
	padding-left: 11px;
	font-size: 15px;
	max-width: 100%;
	flex-wrap: nowrap;
	display: inline-flex;
	justify-content: center;
	overflow-wrap: anywhere;
	color: var(--tq-red-01);
	width: 100%;
	margin: 5px 0;
	animation: ${(props) =>
		props.toggleErrMsg
			? css`
					${showErrMsgAnim} 250ms
			  `
			: ''};
`;

export const BtnsContainer = styled.div`
	width: 95%;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-around;

	@media (max-width: 600px) {
		width: 100%;
		justify-content: space-around;
	}

	@media (max-width: 390px) {
		justify-content: space-between;
	}
`;
