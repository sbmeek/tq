import React, { createContext, useReducer, useEffect, ReactNode } from 'react'
import io from 'socket.io-client'
import en from '../../lang/en'
import es from '../../lang/es'

interface IContextState {
	socket: SocketIOClientStatic['Socket']
	isRendered: boolean
	lang: object
}

interface IContextAction {
	type: string
	payload: any
}

const initialState: IContextState = {
	socket: io('2017'),
	isRendered: false,
	lang: en,
}

export enum ActionEnum {
	SET_SOCKET = 'SET_SOCKET',
	SET_IS_RENDERED = 'SET_IS_RENDERED',
	SET_LANG = 'SET_LANG',
}

export const InitContext = createContext<any>({ state: initialState })

function reducer(state: IContextState, action: IContextAction) {
	switch (action.type) {
		case ActionEnum.SET_SOCKET:
			return {
				...state,
				socket: action.payload.socket,
			}
		case ActionEnum.SET_IS_RENDERED:
			return {
				...state,
				isRendered: action.payload.isRendered,
			}
		case ActionEnum.SET_LANG:
			return {
				...state,
				lang: action.payload.lang,
			}
		default:
			return state
	}
}

export default function <T extends { children: ReactNode }>({ children }: T) {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		try {
			dispatch({
				type: ActionEnum.SET_SOCKET,
				payload: { socket: io() },
			})
		} catch (error) {
			console.error(error)
		}
	}, [])

	useEffect(() => {
		dispatch({
			type: ActionEnum.SET_LANG,
			payload: { lang: gsetLang() },
		})
	}, [])

	const gsetLang = () => {
		switch (navigator.language.substring(0, 2)) {
			case 'es':
				return es
			default:
				return en
		}
	}

	return state.socket !== null ? (
		<InitContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</InitContext.Provider>
	) : null
}
