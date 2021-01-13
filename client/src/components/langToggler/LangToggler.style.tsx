import styled from 'styled-components';

export const LangTogglerWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
	cursor: pointer;
	position: relative;

	& > span {
		margin-right: 10px;
		color: #fff;
	}

	@media (max-width: 420px) {
		margin-top: 25px;
	}
`;

export const Dropdown = styled.div`
	display: flex;
	flex-direction: column;
	height: 230px;
	width: 135px;
	position: absolute;
	background: #fff;
	bottom: 100%;
	border-radius: 10px;
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
	cursor: default;
`;

export const DropdownItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	height: 40px;
	padding: 8px;
	cursor: pointer;

	&:hover {
		background: rgba(225, 225, 225, 0.6);
		border-radius: 10px;
	}

	& > * {
		pointer-events: none;
	}

	& > img {
		width: 24px;
		height: 24px;
	}

	& > span {
		color: var(--tq-dark-gray-02);
		width: 50%;
		height: 24px;
		display: inline-flex;
		align-items: flex-end;
	}
`;

export const FlagLangToggler = styled.img`
	width: 24px;
	height: 24px;
	margin-right: 10px;
`;
