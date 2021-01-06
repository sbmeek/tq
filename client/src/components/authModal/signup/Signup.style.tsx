import styled, { keyframes } from 'styled-components';
import okIcon from 'assets/images/icons/icons-signup/ok-icon.svg';
import eyeLoaderIcon from 'assets/images/icons/tq-eye-loader.svg';
import errorIcon from 'assets/images/icons/icons-signup/error-icon.svg';
import { Link } from 'react-router-dom';
import { inputStyles } from '../style';

export const FieldsContainer = styled.div`
	width: 320px;
	@media (max-width: 600px) {
		width: 100%;
	}
`;

export const FormGroup = styled.div`
	position: relative;
	height: 83px;
	@media (max-width: 600px) {
		width: 100%;
	}
`;

export const Label = styled.label`
	padding-left: 16px;
	font-size: 16px;

	&::after {
		content: ' *';
		color: var(--tq-red-03);
	}

	@media (max-width: 600px) {
		&::after {
			content: '';
		}
	}
`;

type InputPropsType = {
	isValid: boolean | null;
	isLoading: boolean;
};

export const Input = styled.input<InputPropsType>`
	${inputStyles}
	background-position: 96%;
	background-size: ${(props) => (props.isValid === null ? '30px' : '25px')};
	background-repeat: no-repeat;
	background-image: ${({ isLoading, isValid }) =>
		isValid === null && !isLoading
			? ''
			: `url(${isLoading ? eyeLoaderIcon : isValid ? okIcon : errorIcon})`};
	@media (max-width: 600px) {
		margin-bottom: 10px;
		height: 42px;
		width: 100%;
	}
`;

export const BtnsContainer = styled.div`
	width: 95%;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-around;

	@media (max-width: 600px) {
		width: 100%;
		justify-content: space-between;

		& > button {
			max-width: 210px;
			height: 44px;
		}
	}

	@media (max-width: 330px) {
		& * {
			font-size: 16px;
		}
	}
`;

export const LinkTerms = styled(Link)`
	margin-left: 6px;
	color: var(--tq-blue-01);
	text-decoration: none;
	transition: color 100ms;
	font-size: 16px;

	&:hover {
		color: var(--tq-blue-02);
	}
`;

const toggleHelpBox = keyframes`
	0% {
		opacity: 0;
	}
	1% {
		display: flex;
	}
	100% {
		opacity: 1;
	}
`;

export const InfoBox = styled.div`
	position: absolute;
	width: 260px;
	background: var(--tq-blue-00);
	top: 96%;
	left: 4%;
	border-radius: 30px;
	font-size: 13px;
	padding: 13px;
	color: #fff;
	animation: ${toggleHelpBox} 200ms;
	display: flex;
	opacity: 1;
	z-index: 3;
	transition: background 150ms;

	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 10%;
		top: -23%;
		border: 10px solid transparent;
		border-bottom: 10px solid var(--tq-blue-00);
		transition: background 150ms;
	}
`;
