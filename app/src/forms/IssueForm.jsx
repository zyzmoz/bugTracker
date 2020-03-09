import React, { useState, useEffect } from 'react';
import { Button, Callout, Sizes } from 'react-foundation';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

const IssueSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  description: Yup.string().required('O campo nome é obrigatório!'),
  customer_id: Yup.number().required('O campo cliente é obrigatório'),
  user_id: Yup.number().required('O campo usuário é obrigatório'),
  project_id: Yup.number().required('O campo projeto é obrigatório'),  
});

const IssueForm = (props) => {
  const { issue, closeModal, readOnly, users, projects, customers } = props;
  const [errors, setErrors] = useState({});

  

  return (
    <Callout style={styles.callout} size={Sizes.LARGE}>
      <h3>{!issue ? 'Novo Atendimento' : `Atendimento #${issue.id}`}</h3>
      <Formik
        initialValues={issue || {}}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, isSubmitting, handleChange, handleSubmit, handleBlur }) => (
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formItemBlock}>
              <label>Descrição</label>
              <input
                disabled={readOnly}
                name="name"
                value={values.description}
                onChange={handleChange}
                type="text" />
              {errors['description'] && <b style={styles.error}>{errors['description']}</b>}
            </div>  
            <div style={styles.formItemBlock}>
              <label>Cliente</label>
              {/* value={lead} onChange={e => setLead(e.target.value)} */}
              <select disabled={readOnly} name="customer_id">
                {customers && customers.map((customer, i) =>
                  <option  key={i} value={customer.id}>{customer.name}</option>
                )}
              </select>
            </div>  
            <div style={styles.formItem}>
              <label>Técnico</label>
              {/* value={lead} onChange={e => setLead(e.target.value)} */}
              <select disabled={readOnly} name="user_id"  >
                {users && users.map((user, i) =>
                  <option  key={i} value={user.id}>{user.name}</option>
                )}
              </select>
            </div>      
            <div style={styles.formItem}>
              <label>Projeto</label>
              {/* value={lead} onChange={e => setLead(e.target.value)} */}
              <select disabled={readOnly} name="project_id">
                {projects && projects.map((project, i) =>
                  <option  key={i} value={project.id}>{project.name}</option>
                )}
              </select>
            </div>       
            <div style={styles.actions}>
              <Button disabled={readOnly || isSubmitting} type="submit" >Gravar</Button>
              <Button color="alert" type="cancel" onClick={() => closeModal()}>{readOnly ? 'Fechar' : 'Cancelar'}</Button>
            </div>
          </form>
        )}
      </Formik>
    </Callout>
  );
};

const styles = {
  callout: {
    maxWidth: '80%'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  formItem: {
    flex: '0 49%',

  },
  formItemBlock:{
    disply: 'flex',
    width: '100%'
  },
  actions: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  error: {
    padding: '0',
    margin: '0',
    color: '#cc4b37'
  }
}

export default IssueForm;