import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/userActions';
import SearchBar from '../components/SearchBar/SearchBar';

const mapState = (state) => ({
  user: state.user
});

const actions = {
  getAllUsers
}

const Users = (props) => {
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    (async () => {
      await props.getAllUsers();
    })();

  }, []);
  
  return (
    <div>
      <h5>Técnicos</h5>
      <SearchBar 
        placeholder="Pesquisar Técnico"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}      
        onClear={() => setSearchText('')}
      />  
      <div>

      </div>
    </div>
  );
};



export default connect(mapState, actions)(Users);