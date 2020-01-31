import React from 'react';
import { connect } from 'react-redux';

const mapState = (state) => ({
  modal: state.modal
});


const Modal = (props) => {
  const { children, isOpen } = props.modal;
  return (
    <div style={isOpen ? styles.openModal : styles.inactiveModal}>
      {children}
    </div>
  );
};

const styles = {
  openModal: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position:'fixed',
    background: "rgba(32,32,32,0.4)",
    zIndex: 99
  },
  inactiveModal: {
    display: 'none'
  }
}

export default connect(mapState)(Modal);