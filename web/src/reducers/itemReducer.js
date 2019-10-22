import {
	GET_ITEMS,
	ADD_ITEM,
	REMOVE_ITEM,
	UPDATE_ITEM,
	SET_LOADING,
	SET_CURRENT,
	ITEM_ERROR
} from '../actions/types';

const initialState = {
	items: null,
	current: null,
	loading: false,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
				items: action.payload,
				loading: false
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		default:
			return state;
	}
};
