import { css } from 'styled-components';

export const linkStyles = css`
	& {
		color: var(--tq-blue-01);
		text-decoration: none;
		cursor: pointer;
		transition: color 150ms;
		margin-left: 4px;
	}
	&:hover {
		color: var(--tq-blue-02);
	}
`;
