import styled, { css, keyframes } from 'styled-components';

const tqScrollbar = css`
	& {
		scrollbar-width: thin !important;
		scrollbar-color: var(--tq-dark-gray-01) transparent !important;
	}

	&::-webkit-scrollbar {
		width: 6px !important;
		height: 6px !important;
	}

	&::-webkit-scrollbar-thumb {
		background: var(--tq-dark-gray-01) !important;
		border-radius: 10px;
	}
`;

export const Container = styled.div`
	display: flex;
	align-items: flex-end;
	background: var(--tq-dark-gray-02);
	width: 226px;
	height: 425px;
	margin-top: 10px;
	border-radius: 25px;
	overflow: hidden;
	@media (max-width: 490px) {
		background: transparent;
		width: 100%;
		border-radius: 0;
		height: 100%;
	}
`;

export const Form = styled.form`
	display: grid;
	grid-template-rows: minmax(51%, 63%) 34%;
	height: 90%;
	position: relative;

	& > #desktop-text-editor {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		@media (max-width: 490px) {
			display: none;
		}
	}

	@media (max-width: 490px) {
		grid-template-rows: 100%;
		height: 100%;
		width: 100%;
	}
`;

export const OptsContainer = styled.div`
	display: flex;
	align-self: flex-end;
	max-height: fit-content;
	margin: 0px 2px -12px 2px;
	width: 98%;
	overflow-y: hidden;
	z-index: 3;
	background: var(--tq-bg-00);
	border-radius: 29px 29px 21px 21px;

	@media (max-width: 490px) {
		width: 100%;
		margin: 0;
		border-radius: 20px 20px 0 0;
		height: 90px;
		align-items: center;
		justify-content: center;
	}
`;

export const OptsInnerContainer = styled.div`
	display: flex;
	margin: 0px 15px 6px 15px;
	overflow-x: auto;
	overflow-y: hidden;
	background: var(--tq-bg-00);
	border-radius: 38px;

	& > button {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		min-height: 55px;
		min-width: 55px;
		border-radius: 35px;
		margin: 0 5px 9.5px 5px;
		background: var(--tq-dark-gray-02);
		color: #fff;
		padding: 10px;
		z-index: 1;
	}

	& > button.selected {
		background: var(--tq-gray-00);
	}

	& > button > img {
		width: 100%;
		transition: transform 200ms;
	}

	& > button:hover > img {
		transform: scale(1.09);
	}

	& > button > * {
		pointer-events: none;
	}

	@media (max-width: 490px) {
		margin: 0 15px;
		& > button {
			max-height: 55px;
			max-width: 55px;
		}
	}

	${tqScrollbar}
`;

const contToggleOpt = keyframes`
	0% {
		transform: translateY(6%);
	}
	100% {
		transform: translateY(3%);
	}
`;

const toggleOpt = keyframes`
	0% {
				opacity: 0;
			}
			1% {
				display: flex;
				justify-content: center;
			}
			100% {
				opacity: 1;
			}
`;

type AnswerOptsMenuPropsType = {
	shouldAnimToolToggle: boolean;
	showToolsContainer: boolean;
};

export const AnswerOptsMenu = styled.div<AnswerOptsMenuPropsType>`
	position: absolute;
	top: 84%;
	width: 98%;
	margin: 0 2px;
	height: 100%;
	background: var(--tq-dark-gray-02);
	z-index: 0;
	transform: translateY(100%);
	transition: transform 300ms;
	overflow: hidden;

	& > div {
		opacity: 0;
		display: none;
		overflow: hidden;
	}

	& > div.toggle-opt-anim {
		animation: ${toggleOpt} 0.2s;
		display: flex;
		justify-content: center;
		opacity: 1;
		height: 80%;
	}

	@media (max-width: 490px) {
		top: 0;
		border-radius: 30px;
		width: 100%;
		margin: 0;
		height: 90%;
	}
	${(props) =>
		props.showToolsContainer
			? css`
					& {
						z-index: 2;
						transition: transform 300ms;
						transform: translateY(-100%);
						@media (max-width: 490px) {
							transform: translateY(3%);
						}
					}
			  `
			: ''}
	${(props) =>
		props.shouldAnimToolToggle
			? css`
		& {
			animation: ${contToggleOpt} 400ms;
		}
	}`
			: ''}
`;

export const OptStickContainer = styled.span`
	@media (max-width: 490px) {
		display: block;
		width: fit-content;
		height: 20px;
		position: absolute;
		left: calc(50% - 25px);
		cursor: pointer;
	}
`;

export const OptStick = styled.span`
	@media (max-width: 490px) {
		display: inline-block;
		width: 50px;
		height: 5px;
		background: var(--tq-gray-00);
		border-radius: 20px;
	}
`;

export const TextEditorContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	flex-direction: column;
	@media (max-width: 490px) {
		max-width: 272px;
	}
`;

export const InputAnswerContainer = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	width: 100%;
`;

export const InputAnswerInnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 212.44px;
	min-width: 94%;
	font-size: 14px;
`;
