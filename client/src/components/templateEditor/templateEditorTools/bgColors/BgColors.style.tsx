import styled from 'styled-components';

export const Bgcolorscontainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;
	width: 100%;
	height: 100%;
	padding-top: 32px;
	max-width: 280px;
	@media (max-width: 490px) {
		width: 284px;
		min-width: 284px;
		max-width: -1px;
	}
`;

export const Bgcolor = styled.div`
	margin: 15px;
	border: 3px solid #fff;
	box-sizing: content-box;
	cursor: pointer;

	& > div {
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	&,
	& > div {
		border-radius: 8px 22px 8px 8px;
		min-width: 35px;
		min-height: 35px;
	}

	&:nth-child(1) > div {
		background: #f0210f;
	}

	&:nth-child(2) > div {
		background: #40265f;
	}
	&:nth-child(3) > div {
		background: #60224f;
	}
	&:nth-child(4) > div {
		background: #10244f;
	}

	&:nth-child(5) > div {
		background: #90564f;
	}

	&:nth-child(6) > div {
		background: #94124f;
	}

	&:nth-child(7) > div {
		background: #91221f;
	}

	&:nth-child(8) > div {
		background: #50278f;
	}

	&:nth-child(9) > div {
		background: #60257f;
	}

	&:nth-child(10) > div {
		background: #00812b;
	}

	&:nth-child(11) > div {
		background: #0ed14f;
	}

	&:nth-child(12) > div {
		background: #5eff00;
	}
`;
