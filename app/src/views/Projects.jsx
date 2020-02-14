import React, { useState, useEffect } from 'react';
import Octicons, { Search, Pencil, Trashcan } from '@primer/octicons-react';
import SearchBar from '../components/SearchBar/SearchBar';
import { Button } from 'react-foundation';
import ProjectForm from '../forms/ProjectForm';
import { connect } from 'react-redux';
import { closeModal, openModal } from '../actions/modalActions';
import { deleteProject, getAllProjects, saveProject, queryProject } from '../actions/projectActions';
import { getAllUsers } from '../actions/userActions';

const mapState = (state) => ({
  list: state.project.list,
  users: state.user.list
});

const actions = {
  openModal,
  closeModal,
  getAllProjects,
  queryProject,
  saveProject,
  deleteProject,
  getAllUsers
};

const Projects = (props) => {
  const [searchText, setSearchText] = useState('');
  const { list } = props;
  useEffect(() => {
    (async () => {
      await props.getAllProjects();
      await props.getAllUsers();
    })();
  }, []);

  const handleProjectSearch = async (str) => {
    setSearchText(str);
    await props.queryProject(str)
  }

  const handleSaveProject = async (project) => {
    await props.saveProject(project);
    await props.getAllProjects();
    await props.getAllUsers();
  }

  const handleDeleteProject = async (projectId) => {
    const res = confirm('Deseja realmente excluir esse Projeto?');
    if (res) {
      await props.deleteProject(projectId);
      await props.getAllProjects();
      await props.getAllUsers();
    }
  }

  return (
    <div>
      <h5>Projetos</h5>
      <SearchBar
        placeholder="Pesquisar Projetos"
        value={searchText}
        onChange={e => handleProjectSearch(e.target.value)}
        onClear={() => handleProjectSearch('')}
      />
      <Button
        onClick={() => props.openModal(<ProjectForm closeModal={props.closeModal} saveProject={handleSaveProject} users={props.users} />)}
        color="success"
      >
        Novo
      </Button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Linguagem</th>
            <th>Lead</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {list && list.map((project, i) =>
            <tr key={i}>
              <th>{project.name}</th>
              <th>{project.description}</th>
              <th>{project.language}</th>
              <th>{project.leadName}</th>
              <th style={styles.actions}>
                <Button
                  onClick={() => props.openModal(<ProjectForm closeModal={props.closeModal} saveProject={handleSaveProject} users={props.users} readOnly={true} project={project} />)}
                  style={styles.button} color="secondary">
                  <Octicons icon={Search} />
                </Button>
                <Button
                  onClick={() => props.openModal(<ProjectForm closeModal={props.closeModal} saveProject={handleSaveProject} users={props.users} project={project} />)}
                  style={styles.button}>
                  <Octicons icon={Pencil} />
                </Button>
                <Button
                  onClick={() => handleDeleteProject(project.id)}
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


export default connect(mapState, actions)(Projects);