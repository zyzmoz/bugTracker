import { combineReducers } from 'redux';
import user from './userReducer';
import modal from './modalReducer';
import project from './projectReducer';
import customer from './customerReducer';
import issue from './issueReducer';

export default combineReducers({
  state: (state= {}) => state,
  user,
  modal,
  project,
  customer,
  issue
});