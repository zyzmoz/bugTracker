import { createReducer } from './createReducer';
import { GET_ALL_USERS } from '../actions/userActions';

const initalState = {};


const getAllUsers = (state, payload) => {
  return { ...state, ...payload }
}

export default createReducer(initalState, {
  [GET_ALL_USERS]: getAllUsers
});