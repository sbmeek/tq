import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

export const Main = styled.div`
	min-height: 100%;
	display: flex;
	align-items: center;
`;
export const Container = styled.div`
	height: 100%;
	width: 100%;
	text-align: center;
`;

export const InnerContainer = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
	background: rgba(0, 0, 0, 0.5);
	min-width: 400px;
	min-height: 300px;
	border-radius: 1000px 0 0 1000px;
	width: 75%;
	float: right;
	max-width: 1250px;
	@media (max-width: 1150px) {
		width: 89%;
	}
	@media (max-width: 650px) {
		position: relative;
		width: 100%;
		border-radius: 0;
		margin-top: 135px !important;
	}
`;
export const LogoImg = styled.img`
	position: absolute;
	top: -23%;
	left: -9%;
	min-height: 291px;
	min-width: 293px;
	max-width: 203px;
	width: 100%;
	@media (max-width: 1150px) {
		min-height: 280px;
		min-width: 283px;
		top: -28%;
		left: -9%;
    }
    @media (max-width: 650px) {
        position: absolute;
		min-height: 225px;
		min-width: 228px;
		top: -47%;
		left: 2%;
		transform: translate(0%, -6%);
    }
    @media (max-width: 440px) {
        top: -47%;
		left: 14%;
		min-height: 197px;
		min-width: 200px;
    }
    @media (max-width: 335px) {
        left: 21%;
    }
`;
export const InsideText = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-bottom: 19px;
	max-width: 570px;
	width: 100%;
	margin: 0 0 0 20%;
	color: #fff;
	font-family: 'Nunito', sans-serif;
	font-size: 28px;
	text-align: left;
	@media (max-width: 1150px) {
		margin: 0 0 0 26%;
		max-width: 428px;
	}
	@media (max-width: 830px) {
		margin: 0px 0 0 35%;
		max-width: 420px;
    }
    @media  (max-width: 740px) {
        max-width: 300px;
		margin: 0 0 0 37%;
    }
    @media (max-width: 650px) {
        position: absolute;
		max-width: 667px;
		width: 430px;
		left: 2%;
		margin: 59px 0 0 0;
    }
    @media (max-width: 440px) {
        position: relative;
		margin: 65px auto 0 auto;
		max-width: 290px;
    }
    @media (max-width: 335px) {
        position: relative;
		margin: 65px auto 0 auto;
		max-width: 225px;
    }
    
`;
export const Err4s = styled.span`
	color: #9e0004;
`;
export const FirstRowText = styled.span`
	display: inline-block;
	word-wrap: break-word;
	font-size: 22px;
`;
export const SecondRowText = styled.span`
	display: inline-block;
	word-wrap: break-word;
    font-size: 14px;
    @media (max-width: 440px) {
        display: none;
    }
`;

export const LinkStyled = styled(Link)`
	text-decoration: none;
`;

export const btnCustomStyle = css`
	min-width: 115px;
	min-height: 55px;
	border-radius: 1000px;
    font-size: 22.5px;
    margin-top: 15px;

	@media (max-width: 1150px) {
		min-width: 87px;
		min-height: 41px;
		font-size: 18.5px;
	}
	@media (max-width: 740px) {
		margin-top: 10px;
		min-width: 66px;
		min-height: 30px;
		font-size: 15px;
	}
	@media (max-width: 440px) {
		font-size: 16px;
		min-width: 78px;
		min-height: 26px;
	}
`;
