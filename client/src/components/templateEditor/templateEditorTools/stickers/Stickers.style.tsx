import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding-top: 28px;
	max-width: 100%;
`;

export const Sticker = styled.div`
	display: flex;
	align-items: center;
	height: fit-content;
	margin: 11px 2px;
	cursor: pointer;
	z-index: 23;
	background-color: transparent;
	transition: 500ms;
	border-radius: 10px;

	&,
	& > img {
		max-width: 68px;
	}

	& > img {
		height: auto;
	}

	&:focus {
		background: #7b7979;
		height: 73px;
	}
`;
