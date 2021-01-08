import { Link } from 'react-router-dom';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';

export const Container = styled.div`
	display: flex;
	min-height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: #fff;
	z-index: -1;
	@media (max-width: 490px) {
		height: 100%;
		display: block !important;

		& > div:nth-child(1) {
			display: flex;
			position: absolute;
			width: 100%;
			margin-top: 10px;
			justify-content: center;
		}
	}
`;

export const HeadContainer = styled.div`
	display: flex;
	justify-content: space-between;
	@media (max-width: 490px) {
		display: flex;
		justify-content: space-between;
		width: 100%;
		position: absolute;
		padding: 0 20px;
		margin-top: 10px;
	}
`;

const btnHeadStyles = css`
	& {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #fff;
		background-color: var(--tq-red-01);
		border-radius: 35px;
		width: 58px;
		height: 60px;
		z-index: 33;
		padding: 5px;
		text-decoration: none;
		& > i {
			font-size: 46px;
		}
		& > img {
			transition: transform 150ms ease-out, opacity 200ms;
			width: 50px;
			height: 30px;
		}
		&:hover > img {
			transform: scale(1.1);
		}
	}
`;

export const BtnBack = styled(Link)`
	${btnHeadStyles}
`;

export const BtnShare = styled.button`
	${btnHeadStyles}
`;

export const EditorContainer = styled.div`
	@media (max-width: 490px) {
		position: absolute;
	}
`;

export const QuestionContainer = styled.div`
	position: relative;
	background: rgb(255, 72, 72);
	max-width: 260px;
	height: 500px;
	margin-left: 15px;
	transition: background 250ms;
	border-radius: 20px;

	& > div:nth-child(1) {
		position: relative;
	}

	@media (max-width: 490px) {
		display: grid;
		place-items: center;
		grid-template-rows: 80% 20%;
		width: 100%;
		height: 100%;
		max-width: 100% !important;
		border-radius: 0;
		margin: 0;

		& > div:nth-child(1) {
			display: grid;
			place-items: center;
		}
	}
`;

export const Label = styled.div<{ isLabelActive: boolean }>`
	opacity: ${(props) => (props.isLabelActive ? '1' : '0')};
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: -15px;
	left: calc(50% - 18px);
	height: 25px;
	width: 36px;
	border-radius: 10px;
	font-size: 1.3rem;
	background: var(--tq-gray-00);
	transition: opacity 250ms, height 100ms;
`;

export const BtnRemoveLabel = styled.div<{ isRemoveLabelActive: boolean }>`
	font-family: 'Nunito';
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: -25px;
	left: calc(50% + 10px);
	width: 19px;
	height: 18px;
	border-radius: 8px;
	color: #fff;
	background: rgb(245, 46, 46);
	box-shadow: 0 0 2px 0.1px #000;
	transition: opacity 150ms;
	font-size: 0.8em;
	opacity: ${(props) => (props.isRemoveLabelActive ? '1' : '0')};
	cursor: ${(props) => (props.isRemoveLabelActive ? 'pointer' : 'default')};

	& > img {
		width: 9px;
	}
`;

export const Question = styled.div`
	background-color: rgba(0, 0, 0, 0.54);
	width: fit-content;
	font-weight: 600;
	border-radius: 20px;
	padding: 20px;
	max-width: 284px;
	min-width: 186px;
	word-break: break-all;
	margin: 70px 30px 15px 30px;
	text-align: center;

	@media (max-width: 490px) {
		margin: 0;
	}
`;

const toggleStickerAnim = keyframes`
	0% {
		opacity: 0;
		transform: scale(0);
	}
	100% {
		transform: scale(1);
	}
`;

export const AnswerPreview = styled.div`
	margin: 0 15px;
	min-height: 100px;

	& * {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
	}

	& > div {
		max-width: 216px;
		overflow: auto;
		overflow-wrap: break-word;
		text-align: center;
	}

	& > div::-webkit-scrollbar {
		width: 6px !important;
		height: 6px !important;
	}

	& > div::-webkit-scrollbar-thumb {
		background: var(--tq-dark-gray-01) !important;
		border-radius: 10px;
	}

	& > div {
		scrollbar-width: thin !important;
		scrollbar-color: var(--tq-dark-gray-01) transparent !important;
	}
`;

export const Sticker = styled.div<{ runToggleStickerAnim: boolean }>`
	display: grid;
	place-items: center;
	& > img {
		width: 60%;
		max-width: 156px;
		height: auto;
	}

	animation: ${(props) =>
		props.runToggleStickerAnim
			? css`
					${toggleStickerAnim}
			  `
			: ''};
`;

export const BtnToggleEditorBar = styled.div<{ isActive: boolean }>`
	background: var(--tq-dark-gray-01);
	width: 64px;
	height: 64px;
	border-radius: 30px;
	position: fixed;
	bottom: 20px;
	left: 20px;
	cursor: pointer;
	color: #fff;
	z-index: 3;
	display: ${(props) => (props.isActive ? 'grid' : 'none')};
	place-content: center;
`;

export const DisableMenucitoStyle = createGlobalStyle`
	#menucito {
		display: none;
	}
`;

export const MobileEditorContainer = styled.div<{ showMobileEditor: boolean }>`
	@media (max-width: 490px) {
		display: flex;
		align-items: flex-end;
		transition: transform 150ms;
		height: 100%;
		width: 100%;
		max-height: 351px;
		position: absolute;
		top: 42%;
		transform: ${(props) =>
			props.showMobileEditor ? 'translateY(0)' : 'translateY(100px)'};
	}
`;
