import React, { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import { Button } from 'react-foundation';

const Projects = () => {
  const [searchText, setSearchText] = useState('');

  const handleProjectSearch = (str) => {
    setSearchText(str)
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
        onClick={()=> {}}
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
      </table>
    </div>
  );
};

export default Projects;