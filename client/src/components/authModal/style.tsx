import styled, { css } from 'styled-components';

export const AccountIcon = styled.img`
	width: 33px !important;
`;

export const btnCustomStyle = css`
	& {
		width: 47%;
		height: 42px;
		box-shadow: none;
		&:hover {
			box-shadow: none !important;
		}
		& > img {
			width: 23px;
		}
	}
`;

export const inputStyles = css`
	& {
		background: var(--tq-gray-02);
		width: 93%;
		height: 47px;
		border-radius: 20px;
		margin-bottom: 14px;
		padding: 0 50px 0 18px;
		color: #fff;
		font: normal normal bold 20px/26px Nunito;
		transition: opacity 150ms, background-color 150ms;

		:hover,
		:focus {
			opacity: 1;
			background-color: var(--tq-gray-03);
		}
	}
`;
export const modalcustom = css`
	& {
		height: 328px;
		width: 386px;
	}
`;
