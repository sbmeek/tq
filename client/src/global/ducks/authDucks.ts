import axios from 'axios'
import { Dispatch } from 'redux'

export interface IDucksAction {
	type: string;
	payload: any;
}

interface IDucksState {
	user: object;
	isAuthenticated: boolean;
	isLoaded: boolean;
	isStatus500: boolean;
}

const initialData: IDucksState = {
	user: {},
	isAuthenticated: false,
	isLoaded: false,
	isStatus500: false, //Server error
}

// Types
const GET_AUTH_INFO = 'GET_AUTH_INFO'
const SET_MESSAGES = 'SET_MESSAGES'

// Reducer
export default function authReducer(state = initialData, action: IDucksAction) {
	switch (action.type) {
		case GET_AUTH_INFO:
			return {
				...state,
				isStatus500: action.payload.isStatus500,
				user: action.payload.user,
				isLoaded: action.payload.isLoaded,
				isAuthenticated: action.payload.isAuthenticated,
			}
		case SET_MESSAGES:
			const { user } = state
			return {
				...state,
				user: { ...user, messages: action.payload.messages },
			}
		default:
			return state
	}
}

// Actions
export const getAuthInfoAction = () => async (dispatch?: Dispatch) => {
	try {
		const res = await axios.get('/user/authenticated')
		if (res.status !== 500) {
			const { username, enteredname, messages } = res.data
			dispatch!({
				type: GET_AUTH_INFO,
				payload: {
					user: { username, enteredname, messages },
					isAuthenticated: res.data.authenticated,
					isStatus500: false,
					isLoaded: true,
				},
            })
		}
	} catch (error) {
		console.error(error)
		dispatch!({
			type: GET_AUTH_INFO,
			payload: {
				user: null,
				isAuthenticated: false,
				isStatus500: true,
				isLoaded: true,
			},
		})
	}
}

export const setUserMessagesAction = (messages: ITQMessage[]) => async (dispatch: Dispatch) => {
	dispatch({
		type: SET_MESSAGES,
		payload: { messages },
	})
}
