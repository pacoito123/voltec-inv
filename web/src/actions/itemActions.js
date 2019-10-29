import Axios from 'axios';
import { ADD_ITEM, GET_ITEMS, ITEM_ERROR, REMOVE_ITEM, SET_CURRENT, SET_LOADING, UPDATE_ITEM } from './types';

// Get items from server
export const getItems = () => async dispatch => {
	try {
		setLoading();

		const res = await Axios.get('/items');

		dispatch({
			type: GET_ITEMS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: err.response.statusText
		});
	}
};

// Add new item
export const addItem = item => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await Axios.post('/items', item, config);

		dispatch({
			type: ADD_ITEM,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: err.response.statusText
		});
	}
};

// Remove item
export const removeItem = id => async dispatch => {
	try {
		setLoading();

		await Axios.delete(`/items/${id}`);

		dispatch({
			type: REMOVE_ITEM,
			payload: id
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: err.response.statusText
		});
	}
};

// Update item
export const updateItem = item => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		setLoading();

		const res = await Axios.put(`/items/${item.id}`, item, config);

		dispatch({
			type: UPDATE_ITEM,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: err.response.statusText
		});
	}
};

// Set current item
export const setCurrent = item => {
	return {
		type: SET_CURRENT,
		payload: item
	};
};

// Set loading to true
export const setLoading = () => {
	return {
		type: SET_LOADING
	};
};
