import {
	GET_TAGS,
	ADD_TAG,
	REMOVE_TAG,
	CURRENT_TAGS,
	CLEAR_TAGS,
	TAG_ERROR,
	SET_LOADING
} from '../actions/types';

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
