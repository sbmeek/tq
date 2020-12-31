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
	min-width: 100%;
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

export const btnCustomStyle = css<{ section: number | undefined }>`
	& {
		border: 5.9px solid var(--tq-blue-01);
		background-color: var(--tq-blue-02);
		padding: 7px 40px;
		border-radius: 9999px;
		margin-top: 30px;
	}

	${(props) => {
		switch (props.section) {
			case 1:
				return css`
					@media (max-width: 300px) {
						& {
							padding: 7px 10px;
						}
					}
				`;
			case 2:
				return css`
					@media (max-width: 330px) {
						& {
							margin-top: 10px;
						}
					}
					@media (max-width: 290px) {
						& {
							padding: 7px 11px;
						}
					}
				`;
		}
	}}
`;
