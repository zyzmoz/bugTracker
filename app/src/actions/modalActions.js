export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


export const openModal = (children) => {
  return {
    type: OPEN_MODAL,
    payload: { children, isOpen: true }
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}