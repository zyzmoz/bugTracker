import { createReducer } from "./createReducer";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modalActions";

const initalState = {};


const openModal = (state, payload) => {
  return { ...payload };
}

const closeModal = (state, payload) => {
  return initalState;
}


export default createReducer(initalState, {
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal
});
