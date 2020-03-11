import { createReducer } from './createReducer';
import { GET_ALL_ISSUES, SAVE_ISSUE, DELETE_ISSUE, QUERY_ISSUE } from '../actions/issueActions';

const initalState = {};


const getAllIssues = (state, payload) => {

  return { ...state, list: payload.list }
}


const queryIssue = (state, payload) => {

  return { ...state, list: payload.list }
}

const saveIssue = (state) => {
  return { ...state };
}

const deleteIssue = (state) => {
  return { ...state };
}

export default createReducer(initalState, {
  [GET_ALL_ISSUES]: getAllIssues,
  [SAVE_ISSUE]: saveIssue,
  [DELETE_ISSUE]: deleteIssue,
  [QUERY_ISSUE]: queryIssue
});