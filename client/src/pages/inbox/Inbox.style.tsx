import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	@media (min-width: 600px) {
		justify-content: center;
	}
`;

export const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 100%;
	height: 100%;
	@media (min-width: 600px) {
		max-width: 500px;
		min-width: initial;
		width: 100%;
		background: transparent;
	}
`;

export const HeadContainer = styled.div`
	display: inline-flex;
	color: var(--tq-bg-00);
	margin: 25px 13px;
	align-items: baseline;
	justify-content: center;
`;

export const HeadIconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--tq-red-02);
	border-radius: 30px;
	border: 0px solid #000000;
	width: 62px;
	height: 61px;
`;

export const HeadIcon = styled.img`
	height: 70%;
	width: 65.5%;
`;

export const HeadTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

	& > h4 {
		font-size: 3.5em;
		font-family: 'Nunito', sans-serif;
	}

	&::after {
		content: '';
		background-color: rgba(0, 0, 0, 0.25);
		width: 163px;
		height: 8px;
		border-radius: 50%;
		margin-right: 40px;
		margin-top: 5px;
	}
`;

export const TabsContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 11px;
	overflow: auto;
`;

const noMsgsStyle = css`
	& {
		display: none;
		cursor: default;
	}
`;

interface IBtnTabProps {
	isSelected: boolean;
	hasNotAnsweredMsgs?: boolean;
	hasNoMessages?: boolean;
	isAnsTab?: boolean;
}

export const BtnTab = styled.button<IBtnTabProps>`
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	font: normal normal bold 20px Nunito;
	height: 47px;
	width: 40%;
	min-width: 150px;
	transition: background 150ms;
	letter-spacing: 0px;
	margin: 0;
	color: #fff;
	cursor: pointer;
	background: var(--tq-bg-00);
	border-radius: 50px 25px 25px 50px;

	&:hover {
		background: var(--tq-red-00);
	}
	&:focus {
		background: var(--tq-red-02);
	}

	${(props) =>
		props.isSelected
			? css`
					& {
						background: var(--tq-red-03);
						cursor: default;
					}
			  `
			: ''}
	${(props) =>
		props.hasNotAnsweredMsgs
			? css`
					& {
						width: 100%;
						border-radius: 12px;
						@media (max-width: 600px) {
							width: 91% !important;
						}
					}
			  `
			: ''}
	${(props) => (props.hasNoMessages && props.id === 'ans-tab' ? noMsgsStyle : '')}
	${(props) =>
		props.isAnsTab
			? css`
					& {
						margin-left: 5px;
						border-radius: 25px 50px 50px 25px;
					}
			  `
			: ''}
`;

export const NewMsgsContainer = styled.div<{ hasNoMessages: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--tq-red-02);
	font-size: 12px !important;
	margin-left: 5px;
	transition: color 150ms;

	${(props) => (props.hasNoMessages ? noMsgsStyle : '')}
	&::before {
		content: '';
		border-radius: 50%;
		background-color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		width: 20px;
		height: 20px;
		z-index: 1;
		transition: transform 200ms, background-color 150ms;
	}
	& > span {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		z-index: 2;
		min-width: 19px;
		min-height: 22px;
	}
`;

export const TabContent = styled.div<{ isTabSelected: boolean }>`
	display: ${(props) => (props.isTabSelected ? 'flex' : 'none')};
`;

export const MsgsList = styled.div`
	display: flex;
	min-width: 100%;
	background: var(--tq-bg-00);
	border-radius: 50px;
	max-height: 67vh;
	align-items: center;
	justify-content: center;

	@media (min-width: 600px) {
		min-width: 100%;
		max-height: 59vh;
	}
	@media (max-width: 600px) {
		border-radius: 20px;
	}
`;

export const MsgsOffset = styled.div`
	padding: 0px 13px;
	margin: auto 33px;
	min-height: 50vh;
	width: 100%;
	overflow: auto;
	height: 88%;
	border-radius: 50px;
	display: grid;
	place-items: center;

	@media (max-width: 600px) {
		width: 100%;
		margin: 0 6px;
	}

	&::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background: #4d4b4b;
		border-radius: 25px;
	}
	&::-webkit-scrollbar-track-piece > end {
		background: transparent;
		margin-bottom: 10px;
	}
`;

export const MsgContainer = styled.div<{ isOpened?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: var(--tq-dark-gray-01);
	text-overflow: ellipsis;
	color: #fff;
	margin-top: 5px;
	height: 71px;
	font-weight: 700;
	width: 105%;
	padding: 14px;
	cursor: pointer;
	border-radius: 5px;
	border: 0px solid #000000;
	transition: border-radius 200ms cubic-bezier(0, 0.44, 0.98, 1.45),
		height 200ms;
	position: relative;
	&:first-child {
		margin-top: 0;
	}

	&:hover {
		border-radius: 20px;
	}

	&:nth-last-child(1) {
		margin-bottom: 0;
	}

	& > div,
	& > button {
		opacity: 0;
		height: 0;
		width: 0;
		z-index: -1;
	}

	&[data-isopened='true'] {
		& {
			height: 100px;
		}

		&:hover {
			transform: none;
		}

		& > div,
		& > button,
		& > li > button {
			height: auto;
			opacity: 1 !important;
			width: auto;
			z-index: 1;
		}

		& > div {
			display: flex;
			justify-content: center;
			width: 100%;
		}

		& > div > span {
			position: absolute;
			top: 5%;
			font-size: 12px;
		}

		& > div > span::after {
			content: '';
			width: 51px;
			height: 3.5px;
			background: var(--tq-gray-00);
			position: absolute;
			border-radius: 50%;
			left: 0;
			top: 100%;
			opacity: 0.6;
		}

		& > button {
			position: absolute;
			width: 100%;
			left: 0;
			top: calc(100% - 26px);
			height: 28px;
			border-radius: 0 0 10px 10px;
			cursor: pointer;
			justify-content: center;
			display: flex;
			align-items: center;
			transition: background 150ms;
		}

		& > button > span {
			display: block;
			transition: transform 150ms ease-out;
		}

		& > button > img {
			position: absolute;
			transition: transform 150ms ease-out, opacity 200ms;
			opacity: 0;
			width: 22px;
		}

		& > button:hover {
			background: var(--tq-gray-02) !important;
		}
	}
`;

export const MsgItem = styled.li`
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: center;
	list-style: none;
	pointer-events: none;
	& > span {
		opacity: 1 !important;
	}
`;

const msgBtnsStyle = css`
	& {
		height: 20px !important;
		width: 20px !important;
		background: transparent;
		left: 93%;
	}

	& > img {
		color: #fff;
		width: 17px;
	}

	&:hover {
		filter: invert(50%);
	}
`;

export const BtnReport = styled.button`
	position: absolute;
	top: 15px;
	left: 92.8%;
	${msgBtnsStyle}
`;

export const BtnDelete = styled.button`
	position: absolute;
	opacity: 0;
	${msgBtnsStyle}
`;

export const BtnAnswer = styled.button`
	background: var(--tq-gray-00);
	color: #fff;
`;
