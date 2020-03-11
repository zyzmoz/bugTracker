export const GET_ALL_ISSUES = 'GET_ALL_ISSUES';
export const SAVE_ISSUE = 'SAVE_ISSUE';
export const DELETE_ISSUE = 'DELETE_ISSUE';
export const QUERY_ISSUE = 'QUERY_ISSUE';

import axios from 'axios';



export const getAllIssues = () => {
  return async (dispatch) => {
    let res = await axios.get('http://localhost:3000/issues');    
    dispatch({
      type: GET_ALL_ISSUES,
      payload: { list: res.data }
    });
  }
}

export const queryIssue = (str) => {
  return async (dispatch) => {
    let res = await axios.get(`http://localhost:3000/issues?customer=${str}`);    
    dispatch({
      type: QUERY_ISSUE,
      payload: { list: res.data }
    });
  }
}


export const saveIssue = (issueObj) => {
  return async (dispatch) => {
    let res = await axios.post('http://localhost:3000/issues',issueObj);        
    dispatch({
      type: SAVE_ISSUE
    })
  }
}

export const deleteIssue = (issueId) => {
  return async (dispatch) => {
    await axios.post('http://localhost:3000/issues', {id: issueId, deleted: true});        
    dispatch({
      type: DELETE_ISSUE,
    });
  }

}

