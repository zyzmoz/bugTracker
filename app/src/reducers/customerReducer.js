import { createReducer } from './createReducer';
import { GET_ALL_CUSTOMERS, SAVE_CUSTOMER, DELETE_CUSTOMER, QUERY_CUSTOMER } from '../actions/customerActions';

const initalState = {};


const getAllCustomers = (state, payload) => {

  return { ...state, list: payload.list }
}


const queryCustomer = (state, payload) => {

  return { ...state, list: payload.list }
}

const saveCustomer = (state) => {
  return { ...state };
}

const deleteCustomer = (state) => {
  return { ...state };
}

export default createReducer(initalState, {
  [GET_ALL_CUSTOMERS]: getAllCustomers,
  [SAVE_CUSTOMER]: saveCustomer,
  [DELETE_CUSTOMER]: deleteCustomer,
  [QUERY_CUSTOMER]: queryCustomer
});