import { GET_TAGS, ADD_TAG, REMOVE_TAG, TAG_ERROR, SET_LOADING } from './types';
import Axios from 'axios';

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
		dispatch({ type: TAG_ERROR, payload: err.response.statusText });
	}
};

// Set loading to true
export const setLoading = () => {
	return {
		type: SET_LOADING
	};
};
