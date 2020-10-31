/// <reference types="react-scripts" />

declare module 'react-facebook-login/dist/facebook-login-render-props';
declare module '*.css';
declare module 'quill-emoji';

interface ITQMessage {
	sentAt: Date;
	readed: boolean;
	_id: string;
	content: string;
	answer?: string;
}

type CustomStyles =
	| any
	| import('styled-components').FlattenSimpleInterpolation
	| import('styled-components').FlattenInterpolation<
			import('styled-components').ThemedStyledProps<
				{ [key: string]: any | undefined },
				any
			>
	  >
	| readonly import('styled-components').Interpolation<
			import('styled-components').ThemedStyledProps<
				{ [key: string]: any | undefined },
				any
			>
	  >[];
