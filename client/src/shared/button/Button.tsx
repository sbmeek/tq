import React, { useEffect, useRef, useState } from 'react';
import { Button, IProps } from './Button.style';

const useCombinedRefs = (...refs: any[]): any => {
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
	React.ButtonHTMLAttributes<HTMLButtonElement> &
		IProps & { as?: undefined; forwardedAs?: undefined }
>((props, ref) => {
	const btnRef = useRef<HTMLButtonElement>(null);
	const combinedRef = useCombinedRefs(ref, btnRef);
	const [width, setWidth] = useState(0);
	const [customStyleProps, setCustomStyleProps] = useState<{
		[key: string]: any;
	}>({});

	useEffect(() => {
		if (props.customStyleProps) {
			const customProps = props.customStyleProps;
			for (let p in customProps) {
				setCustomStyleProps((oldState) => ({
					...oldState,
					[p]: customProps[p]
				}));
			}
		}
	}, [props.customStyleProps]);

	useEffect(() => {
		if (props.hoverMode === 'translate') {
			const btnCurr = combinedRef.current;
			const handleResize = () => {
				setWidth(btnCurr.getBoundingClientRect().width || btnCurr.offsetWidth);
			};
			handleResize();
			btnCurr.addEventListener('load', handleResize);
			window.addEventListener('resize', handleResize);
			return () => {
				btnCurr.removeEventListener('load', handleResize);
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	return (
		<Button width={width} ref={combinedRef} {...customStyleProps} {...props}>
			{props.children}
		</Button>
	);
});
