import styled from 'styled-components';

type IsActiveType = {
	isActive: boolean;
};

export const Container = styled.div<IsActiveType>`
	position: absolute;
	top: 16px;
	right: 100px;
	width: ${(props) => (props.isActive ? '60%' : '0')};
	max-width: 230px;
	float: right;
	transition: all 150ms;
`;

export const Dialog = styled.div<IsActiveType>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 90px;
	width: 100%;
	background: var(--tq-red-02);
	color: #fff;
	font-family: 'Nunito', sans-serif;
	border-radius: 20px;
	box-shadow: 0 0 3px 0px #000;
	z-index: -24;
	opacity: ${(props) => (props.isActive ? 1 : 0)};
	padding: ${(props) => (props.isActive ? '15px' : '')};
	& > span {
		display: inline-block;
		overflow: hidden;
	}

	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 99%;
		border-top: 10px solid transparent;
		border-right: 10px solid transparent;
		border-left: 10px solid var(--tq-red-02);
		border-bottom: 10px solid transparent;
	}
`;
