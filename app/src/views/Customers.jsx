import React, {useState} from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import { Button } from 'react-foundation';
import Octicon from '@primer/octicons-react';

const Customers = () => {
  const [searchText, setSearchText] = useState('');

  const handleCustomerSearch = (str) => {
    setSearchText(str);
  }
  
  return (
    <div>
      <h5>Clientes</h5>
      <SearchBar 
        placeholder="Pesquisar Clientes"
        value={searchText}
        onChange={e => handleCustomerSearch(e.target.value)}      
        onClear={() => handleCustomerSearch('')}
      />  
      <div>
        <Button
          onClick={() => {}}
          color="success"
        >
          Novo
        </Button>        
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Contato</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;