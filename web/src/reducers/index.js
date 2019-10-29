import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import tagReducer from './tagReducer';

export default combineReducers({
	item: itemReducer,
	tag: tagReducer
});
