import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import io from 'socket.io-client';
import en from '../../lang/en';
import es from '../../lang/es';
import { checkTst } from 'pages/authInTestMode/AuthInTestMode';

interface IContextState {
	socket: SocketIOClientStatic['Socket'];
	lang: object;
	isTester: boolean;
}

interface IContextAction {
	type: string;
	payload: any;
}

const initialState: IContextState = {
	socket: io(),
	lang: en,
	isTester: false
};

export enum ActionEnum {
	SET_LANG = 'SET_LANG',
	SET_SOCKET = 'SET_SOCKET',
	SET_IS_TESTER = 'SET_IS_TESTER'
}

export const InitContext = createContext<any>({ state: initialState });

function reducer(state: IContextState, action: IContextAction) {
	switch (action.type) {
		case ActionEnum.SET_SOCKET:
			return {
				...state,
				socket: action.payload.socket
			};
		case ActionEnum.SET_LANG:
			return {
				...state,
				lang: action.payload.lang
			};
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

	const gsetLang = () => {
		const langPrefix = navigator.language.substring(0, 2);
		document.documentElement.lang = langPrefix;
		switch (langPrefix) {
			case 'es':
				return es;
			default:
				return en;
		}
	};

	useEffect(() => {
		dispatch({
			type: ActionEnum.SET_LANG,
			payload: { lang: gsetLang() }
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
