import { ADD_TAG, GET_TAGS, REMOVE_TAG, SET_LOADING, TAG_ERROR, UPDATE_TAG } from '../actions/types';

const initialState = {
	tags: null,
	current: null,
	loading: false,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_TAGS:
			return {
				...state,
				tags: action.payload,
				loading: false
			};
		case ADD_TAG:
			return {
				...state,
				tags: [...state.tags, action.payload],
				loading: false
			};
		case UPDATE_TAG:
			return {
				...state,
				tags: state.tags.map(tag =>
					tag._id === action.payload._id ? action.payload : tag
				),
				loading: false
			};
		case REMOVE_TAG:
			return {
				...state,
				tags: state.tags.filter(tag => tag._id !== action.payload),
				loading: false
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		case TAG_ERROR:
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
