/// <reference types="react-scripts" />
import {
	FlattenInterpolation,
	FlattenSimpleInterpolation,
	ThemedStyledProps
} from 'styled-components';

declare global {
	module '*.css';
	module 'quill-emoji';
	module 'react-facebook-login/dist/facebook-login-render-props';

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
