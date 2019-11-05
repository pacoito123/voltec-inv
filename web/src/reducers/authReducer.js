import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING, USER_LOADED } from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
