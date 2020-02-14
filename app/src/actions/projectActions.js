export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const SAVE_PROJECT = 'SAVE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const QUERY_PROJECT = 'QUERY_PROJECT';

import axios from 'axios';



export const getAllProjects = () => {
  return async (dispatch) => {
    let res = await axios.get('http://localhost:3000/projects');    
    dispatch({
      type: GET_ALL_PROJECTS,
      payload: { list: res.data }
    });
  }
}

export const queryProject = (str) => {
  return async (dispatch) => {
    let res = await axios.get(`http://localhost:3000/projects?name=${str}`);    
    dispatch({
      type: QUERY_PROJECT,
      payload: { list: res.data }
    });
  }
}


export const saveProject = (userObj) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/projects',userObj);        
    dispatch({
      type: SAVE_PROJECT
    })
  }
}

export const deleteProject = (userId) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/projects', {id: userId, deleted: true});        
    dispatch({
      type: DELETE_PROJECT,
    });
  }

}

