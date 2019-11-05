import Axios from 'axios';
import { ADD_TAG, GET_TAGS, REMOVE_TAG, SET_LOADING, TAG_ERROR, UPDATE_TAG } from './types';

// Get tags from server
export const getTags = () => async dispatch => {
	try {
		setLoading();

		const res = await Axios.get('/api/tags');

		dispatch({
			type: GET_TAGS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TAG_ERROR,
			payload: err.response.statusText
		});
	}
};

// Add tag
export const addTag = tag => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		setLoading();

		const res = await Axios.post('/api/tags', tag, config);

		dispatch({
			type: ADD_TAG,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TAG_ERROR,
			payload: err
		});
	}
};

// Update tag
export const updateTag = tag => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		setLoading();

		const res = await Axios.put(`/api/tags/${tag._id}`, tag, config);

		dispatch({
			type: UPDATE_TAG,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TAG_ERROR,
			payload: err.response.statusText
		});
	}
};

// Remove tag
export const removeTag = _id => async dispatch => {
	try {
		setLoading();

		await Axios.delete(`/api/tags/${_id}`);

		dispatch({
			type: REMOVE_TAG,
			payload: _id
		});
	} catch (err) {
		dispatch({
			type: TAG_ERROR,
			payload: err.response.statusText
		});
	}
};

// Set loading to true
export const setLoading = () => {
	return {
		type: SET_LOADING
	};
};
