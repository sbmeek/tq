import styled from 'styled-components';

export const DialogContainer = styled.div<{ showModal: boolean }>`
	visibility: ${(props) => (props.showModal ? 'visible' : 'hidden')};
	opacity: ${(props) => (props.showModal ? '1' : '0')};
	transition: all 200ms;
`;

export const DialogWrapper = styled.div`
	position: absolute;
	top: -150%;
	left: 105%;
	background: #fff;
	color: #1b1b1b;
	min-width: 216px;
	max-height: 150px;
	border-radius: 30px;
	z-index: 35;
	padding: 20px;
	@media (max-width: 780px) {
		left: 0;
	}
`;

export const BtnCloseDialog = styled.button`
	position: absolute;
	top: 131px;
	left: -1px;
	background: rgba(255, 0, 0, 0.692);
	color: #fff;
	border-radius: 25px;
	font-weight: 800;
	min-height: 17px;
	min-width: 17px;
	cursor: pointer;
	@media (max-width: 780px) {
		top: 110px;
	}
`;
