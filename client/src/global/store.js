import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer, { getAuthInfoAction } from './ducks/authDucks'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
	auth: authReducer,
})

export default function generateStore() {
	const store = createStore(
		rootReducer,
		composeEnhancer(applyMiddleware(thunk))
	)
	store.dispatch(getAuthInfoAction())
	return store
}
