import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar/SearchBar';
import { Button } from 'react-foundation';
import IssueForm from '../forms/IssueForm';
import { openModal, closeModal } from '../actions/modalActions';
import { getAllProjects } from '../actions/projectActions';
import { getAllUsers } from '../actions/userActions';
import { getAllCustomers } from '../actions/customerActions';


const mapState = (state) => ({
  users: state.user.list,
  projects: state.project.list,
  customers: state.customer.list,
});

const actions = {
  openModal,
  closeModal,
  getAllProjects,
  getAllUsers,
  getAllCustomers
}

const Helpdesk = (props) => {
  useEffect(() => {
    (async () => {
      await props.getAllProjects();
      await props.getAllUsers();
      await props.getAllCustomers();
    })();
  }, []);

  return (
    <div>
      <h5>Suporte</h5>
      <SearchBar
        placeholder="Pesquisar"
      // value={searchText}
      // onChange={e => handleProjectSearch(e.target.value)}
      // onClear={() => handleProjectSearch('')}
      />
      <Button
        onClick={() => props.openModal(<IssueForm 
            closeModal={props.closeModal} 
            users={props.users} 
            projects={props.projects} 
            customers={props.customers}
            />
        )}
        color="success"
      >
        Novo
      </Button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default connect(mapState, actions)(Helpdesk);