import styled, { css } from 'styled-components';

const flexCenter = css`
	& {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const Container = styled.div`
	${flexCenter}
	min-height: 100%;
	min-width: 100vw;
	background: #fff;
`;

export const Form = styled.form`
	${flexCenter}
	flex-direction: column;
	width: 100%;
	position: relative;
	& > p {
		max-width: 270px;
		color: var(--tq-dark-gray-02);
	}
`;

export const Logo = styled.img`
	max-width: 480px;
	width: 98%;
	height: auto;
	filter: invert(0.3);
`;

const isErroredStyles = css`
	&::after {
		content: 'Código inválido.';
		display: block;
		position: absolute;
		width: 100%;
		max-width: 290px;
		padding: 0 10px;
		height: 10%;
		overflow-wrap: break-word;
		margin-top: 8px;
		color: var(--tq-red-02);
	}
`;

export const FieldContainer = styled.div<{ isErrored: boolean }>`
	position: relative;
	${(props) => (props.isErrored ? isErroredStyles : '')}
`;

export const KeyField = styled.input`
	display: block;
	width: 100%;
	height: 100%;
	background: #cccccc36;
	border: 1px solid #b1b1b1;
	padding: 14px;
	font-size: 20px;
	border-radius: 20px;
	color: #313131;
	max-width: 415px;
	min-width: 200px;
	margin-top: 15px;
`;

export const ContainerEyeLoader = styled.div`
	position: absolute;
	z-index: 2;
	left: 85%;
	top: 39%;
`;
