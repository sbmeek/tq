import React, { useEffect, useRef, useState } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

type PropsType = {
	group: 'primary' | 'secondary';
	hoverMode: 'translate' | 'color';
	width?: number | string;
	customStyle?: FlattenSimpleInterpolation;
};

const Button = styled.button<PropsType & React.HTMLProps<HTMLButtonElement>>`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) =>
		props.group === 'primary' ? 'var(--tq-red-02)' : 'var(--tq-blue-02)'};
	box-shadow: ${(props) =>
		props.group === 'primary' ? '0px 4.5px var(--tq-red-00)' : ''};
	border-radius: 20px;
	border: 0;
	font-size: 17.5px;
	transition: background-color 220ms ease-in-out, box-shadow 220ms ease-in-out,
		transform 100ms, opacity 150ms;
	cursor: pointer;
	color: #fff;
	&:hover {
		background-color: ${(props) =>
			props.group === 'primary' ? 'var(--tq-red-04)' : 'var(--tq-blue-03)'};
		box-shadow: ${(props) =>
			props.group === 'primary' ? '0px 3.9px var(--tq-red-00)' : ''};
	}
	&:active {
		box-shadow: ${(props) =>
			props.group === 'primary' ? '0px 2px var(--tq-red-00)' : ''};
	}
	& > img {
		margin-left: 2px;
		width: 14px;
	}
	${(props) => props.customStyle}
	${({ hoverMode, width }) => {
		if (hoverMode === 'translate') {
			width = `${width}px`;
			return css`
				 {
					overflow: hidden;
					position: relative;
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
						transform: translateX(-${width});
						transition: transform 150ms ease-out, opacity 200ms;
						min-width: 100%;
						font-size: 2rem;
						opacity: 0;
					}
					&:hover > *:nth-child(1) {
						transform: translateX(${width});
					}
					&:hover > *:nth-child(2) {
						transform: translateX(0);
						opacity: 1;
					}
					& > img {
						width: 22px;
						min-width: 1px !important;
					}
				}
			`;
		} else return '';
	}}
`;

const useCombinedRefs = (...refs: any[]): React.MutableRefObject<any> => {
	const targetRef = React.useRef();

	React.useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) return;

			if (typeof ref === 'function') {
				ref(targetRef.current);
			} else {
				ref.current = targetRef.current;
			}
		});
	}, [refs]);

	return targetRef;
};

export default React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & PropsType
>((props, ref) => {
	const btnRef = useRef<HTMLButtonElement>(null);
	const combinedRef = useCombinedRefs(ref, btnRef);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		if (props.hoverMode === 'translate') {
			const handleResize = () => {
				setWidth(combinedRef.current!.getBoundingClientRect().width);
			};
			window.addEventListener('load', handleResize);
			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('load', handleResize);
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [ref, btnRef, props.hoverMode, combinedRef]);

	return (
		<Button width={width} ref={combinedRef} {...props}>
			{props.children}
		</Button>
	);
});
