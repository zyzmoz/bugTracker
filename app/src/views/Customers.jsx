import React, {useState} from 'react';
import SearchBar from '../components/SearchBar/SearchBar';

const Customers = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <div>
      <h5>Clientes</h5>
      <SearchBar 
        placeholder="Pesquisar Clientes"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}      
        onClear={() => setSearchText('')}
      />  
      <div>

      </div>
    </div>
  );
};

export default Customers;