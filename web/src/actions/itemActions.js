import {
	GET_ITEMS,
	ADD_ITEM,
	REMOVE_ITEM,
	UPDATE_ITEM,
	SET_LOADING,
	ITEM_ERROR,
	SET_CURRENT
} from './types';

// Get items from server
export const getItems = () => async dispatch => {
	try {
		setLoading();

		const res = await fetch('/items');
		const data = await res.json();

		dispatch({ type: GET_ITEMS, payload: data });
	} catch (err) {
		dispatch({ type: ITEM_ERROR, payload: err.response.statusText });
	}
};

// Set current item
export const setCurrent = item => {
	return {
		type: SET_CURRENT,
		payload: item
	};
};

export const setLoading = () => {
	return {
		type: SET_LOADING
	};
};
