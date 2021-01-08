import styled, { css } from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100%;
`;

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 250px;
	min-height: 360px;
	height: 74vh;
	z-index: 2;
`;

export const LogoContainer = styled.div`
	position: relative;
	height: 26%;
	display: flex;
	align-items: flex-end;
`;

export const TQLogo = styled.img<{ isLogoLoaded: boolean }>`
	position: relative;
	max-width: 500px;
	max-height: 400px;
	width: 100%;
	margin-bottom: 25px;
	margin-top: -90px;
	transition: opacity 250ms;
	transform: scale(1);
	opacity: ${(props) => (props.isLogoLoaded ? 1 : 0)};
`;

export const MainElementsContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	z-index: -2;
`;

export const Wrapper = styled.div<{ isFieldLoaded: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	max-width: 300px;
	min-width: 300px;
	width: 70%;
	opacity: ${(props) => (props.isFieldLoaded ? 1 : 0.6)};
	transition: opacity 200ms;

	& > div {
		max-width: 100%;
	}

	@media (max-width: 420px) {
		width: 100%;
		align-items: flex-start;
	}

	@media (max-width: 300px) {
		min-width: 250px;
	}
`;

export const BtnsWrapper = styled.div`
	margin-top: 15px;
	max-width: 302px;
	min-width: 250px;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export const btnCustomStyle = css`
	height: 37px;
	min-width: 47%;
`;
