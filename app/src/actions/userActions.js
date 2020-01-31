export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';
export const QUERY_USER = 'QUERY_USER';

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

export const queryUser = (str) => {
  return async (dispatch) => {
    let res = await axios.get(`http://localhost:3000/users?name=${str}`);    
    dispatch({
      type: QUERY_USER,
      payload: { list: res.data }
    });
  }
}


export const saveUser = (userObj) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/users',userObj);        
    dispatch({
      type: SAVE_USER
    })
  }
}

export const deleteUser = (userId) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/users', {id: userId, deleted: true});        
    dispatch({
      type: DELETE_USER,
    });
  }

}

