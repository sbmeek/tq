import styled from 'styled-components';

export const Overlay = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 34;
	position: fixed;
	top: 0;
	left: 0;
	min-width: 100vw;
	min-height: 100%;
	background: rgba(0, 0, 0, 0.8);
	transition: opacity 250ms;
`;
export const Sharesavemodal = styled.div`
	position: absolute;
	display: flex;
	background: #fff;
	border-radius: 31px;
	height: 328px;
	width: 386px;
	opacity: 0;
	align-items: center;
	flex-direction: column;
	z-index: 35;

	opacity: 1;
`;
export const Titulo = styled.h1`
	color: #1b1b1b;
	font-family: 'Nunito';
	font-size: 35px;
	text-align: center;
	line-height: 34px;
	display: flex;
	padding: 18px;
`;

export const Share = styled.div`
	min-width: 61%;
	display: flex;
	flex-direction: row;
	min-height: 9%;
	margin-bottom: -3px;
	align-items: center;
`;
export const ButtonShare = styled.button`
	width: 69%;
	height: 84%;
	margin: 1.5px;
	border-radius: 125px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: transform 100ms, background 150ms, opacity 150ms;
	overflow: hidden;
	position: relative;

	& > img {
		width: 19px;
		display: block;
		transition: transform 150ms ease-out;
	}
	&:hover > img {
		transform: translateX(120px);
	}
	& > img:nth-child(2) {
		position: absolute;
		transform: translateX(-120px);
		transition: transform 150ms ease-out, opacity 200ms;
		width: 10px;
		font-size: 2rem;
		opacity: 0;
	}
	&:hover > img:nth-child(2) {
		transform: translateX(0);
		opacity: 1;
	}
`;
export const Btn_ = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--tq-red-00);
	cursor: pointer;
	border-radius: 20px;
	transition: transform 100ms, background 150ms, opacity 150ms;
	overflow: hidden;
	position: relative;
	min-width: 112px;
    min-height: 30px;
    width: 250px;
    height: 49px;
	padding: 5px;
	margin: 5px;
	&:hover {
		background: var(--tq-red-01);
	}
	& > h3 {
		display: block;
		color: #fff;
		font-size: 1rem;
		font: normal normal bold 24px/26px Nunito;
		transition: transform 150ms ease-out;
		transform: translateX(0);
		min-width: 100%;
	}
	&:hover > h3 {
		transform: translateX(190px);
	}
	& > img {
		position: absolute;
		transform: translateX(-120px);
		transition: transform 150ms ease-out, opacity 200ms;
		width: 40px;
		height: 20px;
		opacity: 0;
	}
	&:hover > img {
		transform: translateX(0);
		opacity: 1;
	}
	&:nth-child(5) {
		
		width: 112px !important;
		height: 30px;
		margin: 5px;
		
	}
	&:nth-child(5):hover {
		background: var(--tq-red-01);
	}
	&:nth-child(5) > span:nth-child(1) {
		color: WHITE;
		font: normal normal bold 13px/26px Nunito;
        display: block;
        transition: transform 150ms ease-out;
	}
	&:nth-child(5) > span:nth-child(2) {
		color: WHITE;
		font: normal normal bold 13px/26px Nunito;
		position: absolute;
		transform: translateX(-120px);
		transition: transform 150ms ease-out, opacity 200ms;
		width: 10px;
		opacity: 0;
	}
	&:nth-child(5):hover > span:nth-child(1) {
		transform: translateX(150px);
	}
	&:nth-child(5):hover > span:nth-child(2) {
		transform: translateX(0);
		opacity: 1;
	}
`;
