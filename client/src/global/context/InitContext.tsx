import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import io from 'socket.io-client';
import { checkTst } from 'pages/authInPrivateMode/AuthInPrivateMode';
import en from 'lang/en';
import es from 'lang/es';
import esFlag from 'assets/images/lang-flags/es-flag.png';
import enFlag from 'assets/images/lang-flags/en-flag.png';

type LangSelectedType = 'en' | 'es';

interface IContextState {
	socket: SocketIOClientStatic['Socket'];
	lang: object;
	langSelected: LangSelectedType;
	availableLangs: object;
	isTester: boolean;
}

interface IContextAction {
	type: string;
	payload: any;
}

const initialState: IContextState = {
	socket: io(),
	lang: en,
	langSelected: 'en',
	availableLangs: {
		en: { title: 'English', flag: enFlag },
		es: { title: 'Español', flag: esFlag }
	},
	isTester: false
};

export enum ActionEnum {
	SET_LANG = 'SET_LANG',
	SET_SOCKET = 'SET_SOCKET',
	SET_IS_TESTER = 'SET_IS_TESTER'
}

function getLang(langPrefix: string) {
	switch (langPrefix) {
		case 'es':
			return es;
		default:
			return en;
	}
}

export const InitContext = createContext<any>({ state: initialState });

function reducer(state: IContextState, action: IContextAction) {
	switch (action.type) {
		case ActionEnum.SET_SOCKET:
			return {
				...state,
				socket: action.payload.socket
			};
		case ActionEnum.SET_LANG: {
			const langPrefix = action.payload.langSelected;
			return {
				...state,
				lang: getLang(langPrefix),
				langSelected: langPrefix
			};
		}
		case ActionEnum.SET_IS_TESTER:
			return {
				...state,
				isTester: action.payload.isTester
			};
		default:
			return state;
	}
}

export default function <T extends { children: ReactNode }>({ children }: T) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getLangPrefix = () => {
		const selectedLang = localStorage.getItem('selectedLang');
		const langPrefix = selectedLang || navigator.language.substring(0, 2);
		document.documentElement.lang = langPrefix;
		return langPrefix;
	};

	useEffect(() => {
		dispatch({
			type: ActionEnum.SET_LANG,
			payload: { langSelected: getLangPrefix() }
		});
	}, []);

	useEffect(() => {
		(async () => {
			dispatch({
				type: ActionEnum.SET_IS_TESTER,
				payload: { isTester: await checkTst('tq:init-user') }
			});
		})();
	}, []);

	return state.socket !== null ? (
		<InitContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</InitContext.Provider>
	) : null;
}
