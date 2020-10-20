import styled, { css } from 'styled-components';

type PropsType = {
	group: 'primary' | 'secondary';
	hoverMode: 'translate' | 'color';
	minWidth?: number;
};

export default styled.button<PropsType & React.HTMLProps<HTMLButtonElement>>`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) =>
		props.group === 'primary' ? 'var(--tq-red-02)' : 'var(--tq-blue-02)'};
	box-shadow: 0px 4.5px var(--tq-red-00);
	border-radius: 20px;
	border: 0;
	font-size: 17.5px;
	transition: background-color 220ms ease-in-out, box-shadow 220ms ease-in-out,
		transform 100ms, opacity 150ms;
	cursor: pointer;
	color: #fff;
	&:hover {
		background-color: var(--tq-red-04);
		box-shadow: 0px 3.9px var(--tq-red-00);
	}
	&:active {
		box-shadow: 0px 2px var(--tq-red-00);
	}
	& > img {
		margin-left: 2px;
		width: 14px;
	}
	${(props) =>
		props.hoverMode === 'translate'
			? css`
					overflow: hidden;
					position: relative;
					min-width: ${props.minWidth}px;
					& > * {
						display: inline-block;
						transition: transform 150ms ease-out;
					}
					& > *:nth-child(1) {
						transform: translateX(0);
						min-width: 100%;
					}
					& > *:nth-child(2) {
						position: absolute;
						transform: translateX(-${props.minWidth! - 5}px);
						transition: transform 150ms ease-out, opacity 200ms;
						min-width: 100%;
						font-size: 2rem;
						opacity: 0;
					}
					&:hover > *:nth-child(1) {
						transform: translateX(${props.minWidth! - 5}px);
					}
					&:hover > *:nth-child(2) {
						transform: translateX(0);
						opacity: 1;
					}
					& > img {
						width: 22px;
						min-width: 1px !important;
					}
			  `
			: ``}
`;
