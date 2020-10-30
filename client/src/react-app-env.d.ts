/// <reference types="react-scripts" />
import {
	FlattenInterpolation,
	FlattenSimpleInterpolation,
	ThemedStyledProps
} from 'styled-components';

declare module '*.css';
declare module 'quill-emoji';
declare module 'react-facebook-login/dist/facebook-login-render-props';

declare global {
	interface ITQMessage {
		sentAt: Date;
		readed: boolean;
		_id: string;
		content: string;
		answer?: string;
	}

	type CustomStyles =
		| FlattenSimpleInterpolation
		| FlattenInterpolation<
				ThemedStyledProps<{ [key: string]: any | undefined }, any>
		  >
		| readonly Interpolation<
				ThemedStyledProps<{ [key: string]: any | undefined }, any>
		  >[];
}
