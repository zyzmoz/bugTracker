import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, saveUser, deleteUser, queryUser } from '../actions/userActions';
import SearchBar from '../components/SearchBar/SearchBar';
import { Button } from 'react-foundation';
import { openModal, closeModal } from '../actions/modalActions';
import UserForm from '../forms/UserForm';
import Octicons, { Search, Pencil, Trashcan } from '@primer/octicons-react';

const mapState = (state) => ({
  list: state.user.list
});

const actions = {
  getAllUsers,
  saveUser,
  deleteUser,
  queryUser,
  openModal,
  closeModal
}

const Users = (props) => {
  const { list } = props;
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    (async () => {
      await props.getAllUsers();
    })();
  }, []);

  const handleSaveUser = async (userObj) => {
    await props.saveUser(userObj);
    await props.getAllUsers();
  }

  const handleDeleteUser = async (userId) => {
    const res = confirm('Deseja realmente excluir esse Usuário?');
    if (res) {
      await props.deleteUser(userId);
      await props.getAllUsers();
    }
  }

  const handleUserSearch = async (str) => {
    setSearchText(str)
    await props.queryUser(str);
  }



  return (
    <div>
      <h5>Técnicos</h5>
      <SearchBar
        placeholder="Pesquisar Técnico"
        value={searchText}
        onChange={e => handleUserSearch(e.target.value)}
        onClear={() => handleUserSearch('')}
      />
      <div>
        <Button
          onClick={() => props.openModal(<UserForm closeModal={props.closeModal} saveUser={handleSaveUser} />)}
          color="success">Novo
        </Button>        
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {list && list.map(user =>
              <tr key={user.id}>
                <th>{user.name}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th style={styles.actions}>
                  <Button
                    onClick={() => props.openModal(<UserForm closeModal={props.closeModal} saveUser={handleSaveUser} readOnly={true} user={user} />)}
                    style={styles.button} color="secondary">
                    <Octicons icon={Search} />
                  </Button>
                  <Button
                    onClick={() => props.openModal(<UserForm closeModal={props.closeModal} saveUser={handleSaveUser} user={user} />)}
                    style={styles.button}>
                    <Octicons icon={Pencil} />
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    style={styles.button} color="alert">
                    <Octicons icon={Trashcan} />
                  </Button>
                </th>
              </tr>
            )
            }


          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0',
    padding: 0
  },
  button: {
    marginBottom: '3px',
    marginTop: '3px'
  }
}



export default connect(mapState, actions)(Users);