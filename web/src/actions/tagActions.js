import Axios from 'axios';
import { ADD_TAG, GET_TAGS, REMOVE_TAG, SET_LOADING, TAG_ERROR, UPDATE_TAG } from './types';

// Get tags from server
export const getTags = () => async dispatch => {
	try {
		setLoading();

		const res = await Axios.get('/tags');

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

		const res = await Axios.post('/tags', tag, config);

		dispatch({
			type: ADD_TAG,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TAG_ERROR,
			payload: err.response.statusText
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

		const res = await Axios.put(`/tags/${tag.id}`, tag, config);

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
export const removeTag = id => async dispatch => {
	try {
		setLoading();

		await Axios.delete(`/tags/${id}`);

		dispatch({
			type: REMOVE_TAG,
			payload: id
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
