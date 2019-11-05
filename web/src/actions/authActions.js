import Axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING, USER_LOADED } from './types';

// Load user
export const loadUser = () => async dispatch => {
	if (localStorage.token) setAuthToken(localStorage.token);

	try {
		const res = await Axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Register user
export const registerUser = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await Axios.post('/api/users', formData, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		loadUser();
	} catch (err) {
		dispatch({
			type: REGISTER_FAIL,
			payload: err
		});
	}
};

// Login user
export const loginUser = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await Axios.post('/api/auth', formData, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		loadUser();
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
			payload: err
		});
	}
};

// Logout
export const logout = () => dispatch => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERRORS });

// Set loading to true
export const setLoading = () => dispatch => dispatch({ type: SET_LOADING });
