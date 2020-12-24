import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	width: 100%;
	height: 100%;
	padding: 32px 12px 0 12px;
`;

export const Label = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--tq-dark-gray-00);
	margin: 2px;
	border-radius: 25px;
	min-width: 45px;
	min-height: 45px;
	font-size: 31px;
	cursor: pointer;
	transition: 500ms;

	&:focus {
		background-color: var(--tq-gray-00);
	}

	& > span {
		text-align: center;
		width: 100%;
	}

	&:nth-child(1) {
		color: rgb(0, 0, 153);
	}
	&:nth-child(2) {
		color: rgb(206, 0, 0);
	}
	&:nth-child(3) {
		color: rgb(243, 239, 1);
	}
	&:nth-child(4) {
		color: rgb(255, 51, 0);
	}
	&:nth-child(5) {
		color: rgb(0, 197, 204);
	}
`;
