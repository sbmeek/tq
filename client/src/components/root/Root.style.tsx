import styled, { createGlobalStyle, css } from 'styled-components';

export const HideMenucitoStyle = createGlobalStyle`
	#menucito {
		display: none;
	}
`;

export const flexCenterColumn = css`
	& {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
	min-width: 100%;
	height: 100%;
`;

export const Section = styled.div<{ isVisible: boolean }>`
	${flexCenterColumn}
	width: 100%;
	min-width: 256px;
	height: 100%;
	min-height: 605px;
	position: relative;
	transition: transform 500ms, opacity 300ms;
	opacity: ${(props) => (props.isVisible ? 1 : 0)};
	transform: ${(props) =>
		props.isVisible ? 'translateY(0)' : 'translateY(100px)'};

	& a {
		text-decoration: none !important;
	}
`;
