import styled, { css } from 'styled-components';

export const AnswerImg = styled.img`
	display: none;
	position: fixed;
	left: -999rem;
`;

export const customContainerStyle = css`
	& {
		@media (max-width: 420px) {
			padding: 20px 0;
			width: 100%;
		}
	}
`;

export const customInnerContainerStyle = css`
	& {
		justify-content: end;
		max-width: 340px;
		max-height: 140px;
		@media (max-width: 489px) {
			& {
				max-height: 150px;
			}
		}
		@media (max-width: 350px) {
			& {
				max-height: 190px;
				min-height: 210px;
			}
		}
	}
`;

export const Title = styled.h2`
	text-align: center;
	@media (max-width: 310px) {
		font-size: 1.4em;
		margin: 0 10px;
	}
`;

export const BtnsWrapper = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
	padding: 0 10px;
	width: 100%;

	@media (max-width: 350px) {
		& {
			flex-direction: column-reverse;
			align-items: center;
		}
	}
`;

export const btnCustomStyle = css`
	& {
		padding: 7px;
		min-width: 125px;
		box-shadow: none !important;
		@media (max-width: 350px) {
			& {
				width: 80%;
			}
			&:first-child {
				margin-top: 12px;
			}
		}
	}
`;

export const Note = styled.small`
	color: rgb(73, 73, 73);
	font-size: 0.8rem;
	padding: 12px;
`;
