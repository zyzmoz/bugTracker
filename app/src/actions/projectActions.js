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


export const saveProject = (projectObj) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/projects',projectObj);        
    dispatch({
      type: SAVE_PROJECT
    })
  }
}

export const deleteProject = (projectId) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/projects', {id: projectId, deleted: true});        
    dispatch({
      type: DELETE_PROJECT,
    });
  }

}

