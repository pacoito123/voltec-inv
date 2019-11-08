import { ADD_ITEM, CLEAR_CURRENT, CLEAR_FILTER, FILTER_ITEMS, GET_ITEMS, ITEM_ERROR, REMOVE_ITEM, SET_CURRENT, SET_LOADING, UPDATE_ITEM } from '../actions/types';

const initialState = {
	items: null,
	current: null,
	filtered: null,
	loading: true,
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
		case ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.payload],
				loading: false
			};
		case REMOVE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload),
				loading: false
			};
		case UPDATE_ITEM:
			return {
				...state,
				items: state.items.map(item =>
					item._id === action.payload._id ? action.payload : item
				),
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
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case FILTER_ITEMS:
			return {
				...state,
				filtered: state.items.filter(item => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return (
						item.name.match(regex) ||
						item.tags.includes(action.payload)
					);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case ITEM_ERROR:
			console.error(action.payload);
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
};
