import { createReducer } from './createReducer';
import { GET_ALL_USERS, SAVE_USER, DELETE_USER, QUERY_USER } from '../actions/userActions';

const initalState = {};


const getAllUsers = (state, payload) => {
  
  return { ...state, list: payload.list }
}


const queryUser = (state, payload) => {
  
  return { ...state, list: payload.list }
}

const saveUser = (state) => {
  return {...state};
}

const deleteUser = (state) => {
  return {...state};
}

export default createReducer(initalState, {
  [GET_ALL_USERS]: getAllUsers,
  [SAVE_USER]: saveUser,
  [DELETE_USER]: deleteUser,
  [QUERY_USER]: queryUser
});