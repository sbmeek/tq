import axios from 'axios';

const initialData = {
    user: null,
    isAuthenticated: false,
    isLoaded: false,
    isStatus500: false, //Server error
}

// Types
const GET_AUTH_INFO = 'GET_AUTH_INFO';
//const GET_AUTH_INFO_ERROR = 'GET_AUTH_INFO_ERROR';

// Reducer
export default function authReducer(state = initialData, action){
    switch(action.type){
        case GET_AUTH_INFO:
            return {
                ...state,
                isStatus500: action.payload.isStatus500,
                user: action.payload.user,
                isLoaded: action.payload.isLoaded,
                isAuthenticated: action.payload.isAuthenticated
            };
        default:
            return state;
    }
}

// Actions
export const getAuthInfoAction = () => async (dispatch) => {
    try {
        const res = await axios.get('/user/authenticated');
        if(res.status !== 500){
            const { username, enteredname, messages } = res.data;
            dispatch({
                type: GET_AUTH_INFO,
                payload: {
                    user: { username, enteredname, messages },
                    isAuthenticated: res.data.authenticated,
                    isStatus500: false,
                    isLoaded: true
                }
            });
        }   
    } catch (error) {
        console.error(error)
        dispatch({
            type: GET_AUTH_INFO,
            payload: {
                user: null,
                isAuthenticated: false,
                isStatus500: true,
                isLoaded: true
            }
        });
    }
}

// export const setAuthInfoAction = ({ authenticated, enteredname }) => (dispatch) => {
//     dispatch({
//         type: SET_AUTH_INFO
//         payload: {
//             isAuthenticated: authenticated,
            
//         }
//     })
// }