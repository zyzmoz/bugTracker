import { combineReducers } from 'redux';
import userReducer from './userReducer';

export default combineReducers({
  state: (state= {}) => state,
  user: userReducer
});