import styled, { keyframes } from 'styled-components';
import layer from 'assets/images/msg/layer.png';

export const Container = styled.div`
	height: 100%;
`;

export const Curtain = styled.form`
	min-height: 100%;
	display: grid;
	place-items: end;
`;

export const MiniCurtain = styled.div`
	display: flex;
	justify-content: center;
	height: 80%;
	min-width: 100vw;
	background: #fff;
`;

export const CloudTop = styled.div`
	display: flex;
	justify-content: space-between;
	position: fixed;
	align-items: flex-end;
	margin: -37px;
	margin-right: 57px;

	& > img {
		width: auto;
		height: 70px;
		z-index: 1;
		position: absolute;
		bottom: 15px;
		left: 125px;
	}
	& > img:nth-child(2) {
		height: 58px;
		right: 0px;
		left: -119px;
	}

	@media only screen and (max-width: 542px) {
		& > img:nth-child(1) {
			height: 50px;
		}
		& > img:nth-child(2) {
			height: 57px;
		}
	}
`;

export const Layer = styled.div`
	background-image: url(${layer});
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: 50% 0%;
	min-height: 80%;
	width: 100%;
	max-width: 880px;
	margin-top: -62px;
	padding-top: 66px;
	max-height: 55%;

	@media (max-width: 878px) {
		background-size: 120% 62%;
		min-height: 58%;
		max-height: 650px;
	}

	@media (max-width: 600px) {
		background-size: 164% 57%;
		max-height: 570px;
	}
`;

export const EnLayer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: -102px;

	& > div:nth-child(1) {
		box-sizing: content-box;
		min-height: 157px;
		min-width: 160px;
		max-width: 170px;
		border-radius: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 5px solid #000000;
		@media (max-width: 542px) {
			max-width: 160px;
		}
	}
	& > div:nth-child(1) > img {
		width: 100%;
		height: auto;
	}
	& > div:nth-child(2) {
		background-color: #00000045;
		width: 163px;
		height: 9px;
		margin: 15px;
		border-radius: 50%;
	}
	& > h3 {
		padding: 2px;
		color: var(--tq-blue-05);
		font-size: 264%;
		font-family: 'Nunito', sans-serif;
		margin-top: -13px;
	}
	& > h5 {
		color: #efebeb;
		font-size: 106%;
		margin-top: -2px;
	}
	& > h5:nth-child(2) {
		margin-top: -3px;
		margin-bottom: 2px;
	}
`;

export const Box = styled.div`
	z-index: 1;
	margin-top: 70px;

	& > div:nth-child(1) {
		display: flex;
	}
	& > div:nth-child(1) > button {
		margin-left: 18px;
		background: transparent;
	}
	& > div:nth-child(1) img {
		height: 14px;
		filter: invert(50%);
	}
	& > div:nth-child(1) > div {
		display: flex;
		justify-content: flex-end;
		width: 58%;
	}
	& > div:nth-child(1) > div > button {
		margin-left: 18px;
		background: transparent;
	}
	& > div:nth-child(1) > div > img {
		height: 21px;
		width: 35px;
		margin: -1px;
		filter: invert(50%);
	}

	& > div:nth-child(2) {
		position: fixed;
		display: flex;
		justify-content: center;
		z-index: -1;
		margin-top: 56px;
	}
	& > div:nth-child(2) > img {
		width: 89px;
		height: 70px;
		transform: scaleX(-1);
		margin-top: -68px;
		margin-left: -27px;
	}
	& > div:nth-child(2) > img:nth-child(2) {
		width: auto;
		height: 68px;
		margin-left: 138px;
		margin-top: -69px;
	}

	@media (max-width: 480px) {
		width: 282px;
	}

`;

const ShowSubmitBtn = keyframes`
0% {
		transform: translateX(-2%);
		opacity: 0;
	}
	1% {
		display: grid;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
`;

export const InputContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;

	&::after {
		content: '';
		display: block;
		background-color: #0000004a;
		width: 84%;
		height: 8px;
		border-radius: 50%;
		bottom: -28px;
		left: 15%;
		z-index: -1;
		position: absolute;
	}

	& > textarea {
		width: 343px;
		height: 135px !important;
		resize: none;
		font-family: 'Balsamiq Sans', cursive;
		border-color: #969696 !important;
		border: #969696 !important;
		outline: none !important;
		background-color: #d4d4d4;
		border-radius: 12px;
		font-size: 16px;
		padding: 12px;
		z-index: 1;
		position: relative;
	}

	& > button {
		font-family: 'Nunito', sans-serif;
		text-transform: none;
		background-color: var(--tq-blue-01);
		width: 44px;
		height: 50px;
		border-radius: 10px 78px 78px 0px;
		border: 0px solid #000000;
		color: transparent;
		display: none;
		place-items: center;
		position: absolute;
		left: 100%;

		&.active {
			animation: ${ShowSubmitBtn} 200ms;
			display: grid;
		}

		& > img {
			max-height: 20px;
		}
	}
`;

export const CloudBottom = styled.div`
	display: flex;
	position: fixed;
	justify-content: center;
	margin-left: -99px;
	margin-top: -26px;
	z-index: 1;
	& > img {
		width: 180px;
		height: auto;
	}

	
	
`;
