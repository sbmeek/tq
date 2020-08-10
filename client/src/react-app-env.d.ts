/// <reference types="react-scripts" />

declare module '*.css';

declare interface ITQMessage {
	sentAt: Date;
	readed: boolean;
	_id: string;
	content: string;
	answer?: string;
}