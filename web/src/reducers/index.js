import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import tagReducer from './tagReducer';

export default combineReducers({
	item: itemReducer,
	tag: tagReducer,
	auth: authReducer
});
