import { combineReducers } from 'redux';
import user from './userReducer';
import modal from './modalReducer';
import project from './projectReducer';

export default combineReducers({
  state: (state= {}) => state,
  user,
  modal,
  project
});