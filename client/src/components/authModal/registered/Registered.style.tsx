import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
`;

export const Logo = styled.img`
	position: relative;
	width: 500px;
	height: auto;
	top: -15px;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	position: relative;
	top: -15px;
`;

export const Title = styled.h1`
	font-size: 32px;
`;

export const Paragraph = styled.p`
	max-width: 410px;
	font-size: 16px;
	font-family: NunitoBold;
`;

export const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 50%;
	transition: transform 150ms;
	cursor: pointer;
	&:hover {
		transform: scale(1.1);
	}

	&:hover > img {
		transform: translateX(5px) rotateY(180deg);
		filter: drop-shadow(0px 0px 1px black) contrast(5.5) invert(0.97)
			saturate(1) sepia(0.001) brightness(0.9);
	}

	&:hover > span {
		color: var(--tq-blue-02);
	}

	& > span {
		font-size: 35px;
	}
`;

export const ArrowIcon = styled.img`
	width: 35px;
	height: 35px;
	transform: rotateY(180deg);
	filter: drop-shadow(0px 0px 1px black) contrast(5.5) invert(0.8) saturate(1)
		sepia(0.001) brightness(0.9);
	transition: filter 150ms, transform 150ms;
`;
