export const GET_ALL_USERS = 'GET_ALL_USERS';

import axios from 'axios';



export const getAllUsers = () => {
  return async (dispatch) => {
    let res = await axios.get('http://localhost:3000/users');
    dispatch({
      type: GET_ALL_USERS,
      payload: { list: res.data }
    });
  }
}

