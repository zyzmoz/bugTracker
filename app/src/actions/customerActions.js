export const GET_ALL_CUSTOMERS = 'GET_ALL_CUSTOMERS';
export const SAVE_CUSTOMER = 'SAVE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const QUERY_CUSTOMER = 'QUERY_CUSTOMER';

import axios from 'axios';

export const getAllCustomers = () => {
  return async (dispatch) => {
    let res = await axios.get('http://localhost:3000/customers');
    dispatch({
      type: GET_ALL_CUSTOMERS,
      payload: { list: res.data }
    });
  }
}

export const queryCustomer = (str) => {
  return async (dispatch) => {
    let res = await axios.get(`http://localhost:3000/customers?name=${str}`);
    dispatch({
      type: QUERY_CUSTOMER,
      payload: { list: res.data }
    });
  }
}


export const saveCustomer = (customerObj) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/customers', customerObj);
    dispatch({
      type: SAVE_CUSTOMER
    })
  }
}

export const deleteCustomer = (customerId) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/customers', { id: customerId, deleted: true });
    dispatch({
      type: DELETE_CUSTOMER,
    });
  }

}

