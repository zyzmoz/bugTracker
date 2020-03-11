import React, { useEffect } from 'react';
import Octicons, { Trashcan, Pencil, Search } from '@primer/octicons-react';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar/SearchBar';
import { Button } from 'react-foundation';
import IssueForm from '../forms/IssueForm';
import { openModal, closeModal } from '../actions/modalActions';
import { getAllProjects } from '../actions/projectActions';
import { getAllUsers } from '../actions/userActions';
import { getAllCustomers } from '../actions/customerActions';
import { getAllIssues, saveIssue } from '../actions/issueActions';

const status = [
  {
    id: 1,
    description: 'Aberto',
    color: '#BFFCC6'
  },
  {
    id: 2,
    description: 'Em Andamento',
    color: '#FFF5BA'
  },
  {
    id: 3,
    description: 'Fechado',
    color: '#6EB5FF'
  },
]


const mapState = (state) => ({
  users: state.user.list,
  projects: state.project.list,
  customers: state.customer.list,
  issues: state.issue.list
});

const actions = {
  openModal,
  closeModal,
  getAllProjects,
  getAllUsers,
  getAllCustomers,
  getAllIssues,
  saveIssue
}

const Helpdesk = (props) => {
  const { issues } = props;
  useEffect(() => {
    (async () => {
      await props.getAllProjects();
      await props.getAllUsers();
      await props.getAllCustomers();
      await props.getAllIssues()
    })();
  }, []);

  const handleSaveIssue = async (issue) => {
    await props.saveIssue(issue);
    await props.getAllIssues();
  }

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
          saveIssue={handleSaveIssue}
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
          {issues && issues.map((issue, i) =>
            <tr key={issue.id}>
              <th>{issue.id}</th>
              <th>{issue.customer}</th>
              <th>{issue.created_at}</th>
              <th>{"Aberto"}</th>
              <th style={styles.actions}>
                <Button
                  onClick={() => props.openModal(<IssueForm
                    closeModal={props.closeModal}
                    users={props.users}
                    projects={props.projects}
                    customers={props.customers}
                    saveIssue={handleSaveIssue}
                    readOnly={true}
                    issue={issue}
                  />
                  )}
                  style={styles.button} color="secondary">
                  <Octicons icon={Search} />
                </Button>
                <Button
                  onClick={() => props.openModal(<IssueForm
                    closeModal={props.closeModal}
                    users={props.users}
                    projects={props.projects}
                    customers={props.customers}
                    saveIssue={handleSaveIssue}
                    issue={issue}
                  />
                  )}
                  style={styles.button}>
                  <Octicons icon={Pencil} />
                </Button>
                <Button
                  // onClick={() => handleDeleteProject(project.id)}
                  style={styles.button} color="alert">
                  <Octicons icon={Trashcan} />
                </Button>
              </th>
            </tr>
          )}
        </tbody>
      </table>
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

export default connect(mapState, actions)(Helpdesk);