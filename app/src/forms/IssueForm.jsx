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
  description: Yup.string().required('O campo descrição é obrigatório!'),
  customer_id: Yup.number().required('O campo cliente é obrigatório'),
  user_id: Yup.number().required('O campo usuário é obrigatório'),
  project_id: Yup.number().required('O campo projeto é obrigatório'),
});

const IssueForm = (props) => {
  const { issue, closeModal, readOnly, users, projects, customers } = props;
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState();
  const [project, setProject] = useState();
  const [customer, setCustomer] = useState();

  const handleSubmit = (values) => {
    const issue = { ...values, user_id: user, project_id: project, customer_id: customer };
    console.log(issue);
  }


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
              <select disabled={readOnly} name="customer_id" value={customer} onChange={e => setCustomer(e.target.value)}>
                {customers && customers.map((customer, i) =>
                  <option key={i} value={customer.id}>{customer.name}</option>
                )}
              </select>
            </div>
            <div style={styles.formItem}>
              <label>Técnico</label>

              <select disabled={readOnly} name="user_id" value={user} onChange={e => setUser(e.target.value)}>
                {users && users.map((user, i) =>
                  <option key={i} value={user.id}>{user.name}</option>
                )}
              </select>
            </div>
            <div style={styles.formItem}>
              <label>Projeto</label>

              <select disabled={readOnly} name="project_id" value={project} onChange={e => setProject(e.target.value)}>
                {projects && projects.map((project, i) =>
                  <option key={i} value={project.id}>{project.name}</option>
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
  formItemBlock: {
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