import React, {useState} from 'react';
import SearchBar from '../components/SearchBar/SearchBar';

const Projects = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <div>
      <h5>Projetos</h5>
      <SearchBar 
        placeholder="Pesquisar Projetos"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}      
        onClear={() => setSearchText('')}
      />  
      <div>

      </div>
    </div>
  );
};

export default Projects;