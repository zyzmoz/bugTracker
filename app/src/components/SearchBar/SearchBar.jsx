import React from 'react';
import { Button } from 'react-foundation';
import Octicon, { Trashcan } from '@primer/octicons-react';
import { Animated } from 'react-animated-css';

const SearchBar = ({placeholder, value, onChange, onClear}) => {
  
  return (
    <div style={styles.searchBar}>
      <input style={styles.input} type="text" value={value} onChange={e => onChange(e)} placeholder={placeholder} />
      {(value && value.length) > 0 &&
        <Animated animationIn="slideInLeft" isVisible={true}>
          <Button onClick={onClear} style={styles.button} color="alert">
            <Octicon icon={Trashcan} />
          </Button>
        </Animated>
      }
    </div >
  );
};

const styles = {
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    height: '39px'
  },
  buttonActive: {
    display: 'block',
    transition: '5.5s',
    height: '39px'
  },


}

export default SearchBar;