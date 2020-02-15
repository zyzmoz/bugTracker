import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import CustomerForm from '../forms/CustomerForm';
import { deleteCustomer, queryCustomer, getAllCustomers, saveCustomer } from '../actions/customerActions';
import { connect } from 'react-redux';
import { closeModal, openModal } from '../actions/modalActions';
import { Button } from 'react-foundation';
import Octicons, { Pencil, Search, Trashcan } from '@primer/octicons-react';

const mapState = (state) => ({
  list: state.customer.list
});

const actions = {
  closeModal,
  openModal,
  deleteCustomer,
  queryCustomer,
  saveCustomer,
  getAllCustomers
}

const Customers = (props) => {
  const {
    closeModal,
    openModal,
    deleteCustomer,
    queryCustomer,
    saveCustomer,
    getAllCustomers,
    list
  } = props;

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    (async () => await getAllCustomers())();
  }, []);

  const handleCustomerSearch = async (str) => {
    setSearchText(str);
    await queryCustomer(str);
  }

  const handleSaveCustomer = async (obj) => {
    await saveCustomer(obj);
    await getAllCustomers();
  }

  const handleDeleteCustomer = async (customerId) => {
    const res = confirm('Deseja realmente excluir esse Cliente?');
    if (res) {
      await deleteCustomer(customerId);
      await getAllCustomers();
    }
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
          onClick={() => openModal(<CustomerForm closeModal={closeModal} saveCustomer={handleSaveCustomer} />)}
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
            {list && list.map((customer, i) =>
              <tr key={i}>
                <th>{customer.name}</th>
                <th>{customer.phone}</th>
                <th>{customer.email}</th>
                <th>{customer.contact}</th>
                <th style={styles.actions}>
                  <Button
                    onClick={() => props.openModal(<CustomerForm closeModal={closeModal} saveCustomer={handleSaveCustomer} readOnly={true} customer={customer} />)}
                    style={styles.button} color="secondary">
                    <Octicons icon={Search} />
                  </Button>
                  <Button
                    onClick={() => props.openModal(<CustomerForm closeModal={closeModal} saveCustomer={handleSaveCustomer} customer={customer} />)}
                    style={styles.button}>
                    <Octicons icon={Pencil} />
                  </Button>
                  <Button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    style={styles.button} color="alert">
                    <Octicons icon={Trashcan} />
                  </Button>
                </th>
              </tr>
            )}
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


export default connect(mapState, actions)(Customers);