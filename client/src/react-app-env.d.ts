/// <reference types="react-scripts" />

declare module '*.css';
declare module 'quill-emoji';
declare module 'react-facebook-login/dist/facebook-login-render-props';

declare interface ITQMessage {
	sentAt: Date;
	readed: boolean;
	_id: string;
	content: string;
	answer?: string;
}
