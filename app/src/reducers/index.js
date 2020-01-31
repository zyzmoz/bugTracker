import { combineReducers } from 'redux';
import userReducer from './userReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  state: (state= {}) => state,
  user: userReducer,
  modal: modalReducer
});