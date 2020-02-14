import { createReducer } from './createReducer';
import { GET_ALL_PROJECTS, SAVE_PROJECT, DELETE_PROJECT, QUERY_PROJECT } from '../actions/projectActions';

const initalState = {};


const getAllProjects = (state, payload) => {

  return { ...state, list: payload.list }
}


const queryProject = (state, payload) => {

  return { ...state, list: payload.list }
}

const saveProject = (state) => {
  return { ...state };
}

const deleteProject = (state) => {
  return { ...state };
}

export default createReducer(initalState, {
  [GET_ALL_PROJECTS]: getAllProjects,
  [SAVE_PROJECT]: saveProject,
  [DELETE_PROJECT]: deleteProject,
  [QUERY_PROJECT]: queryProject
});