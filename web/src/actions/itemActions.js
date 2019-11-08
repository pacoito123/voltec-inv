import Axios from 'axios';
import { ADD_ITEM, CLEAR_CURRENT, CLEAR_FILTER, FILTER_ITEMS, GET_ITEMS, ITEM_ERROR, REMOVE_ITEM, SET_CURRENT, SET_LOADING, UPDATE_ITEM } from './types';

// Get items from server
export const getItems = () => async dispatch => {
	try {
		setLoading();

		const res = await Axios.get('/api/items');

		dispatch({
			type: GET_ITEMS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: err
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
		const res = await Axios.post('/api/items', item, config);

		dispatch({
			type: ADD_ITEM,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: err
		});
	}
};

// Remove item
export const removeItem = _id => async dispatch => {
	try {
		setLoading();

		await Axios.delete(`/api/items/${_id}`);

		dispatch({
			type: REMOVE_ITEM,
			payload: _id
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: err
		});
	}
};

// Update item
export const updateItem = (item, grab) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		setLoading();

		const res = await Axios.put(
			`/api/items/${item._id}`,
			[item, grab],
			config
		);

		dispatch({
			type: UPDATE_ITEM,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: ITEM_ERROR,
			payload: err
		});
	}
};

// Set current item
export const setCurrent = item => dispatch => {
	dispatch({
		type: SET_CURRENT,
		payload: item
	});
};

// Clear current item
export const clearCurrent = () => dispatch =>
	dispatch({
		type: CLEAR_CURRENT
	});

// Filter Items
export const filterItems = text => dispatch =>
	dispatch({
		type: FILTER_ITEMS,
		payload: text
	});

// Clear Filter
export const clearFilter = () => dispatch =>
	dispatch({
		type: CLEAR_FILTER
	});

// Set loading to true
export const setLoading = () => dispatch =>
	dispatch({
		type: SET_LOADING
	});
