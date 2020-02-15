import React, { useState, useEffect } from 'react';
import { Button, Callout, Sizes } from 'react-foundation';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ProjectSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  name: Yup.string().required('O campo nome é obrigatório!'),
  description: Yup.string().nullable(),
  language: Yup.string().nullable(),
  lead: Yup.number()
});

const ProjectForm = (props) => {
  const { project, closeModal, saveProject, readOnly, users } = props;
  const [errors, setErrors] = useState({});
  const [lead, setLead] = useState(project['lead'] || 0);

  const handleSubmit = async (values) => {
    delete values.leadName;
    values = { ...values, lead };    
    setErrors({});
    const { message, path, errors } = await ProjectSchema.validate(values);

    if (errors) {
      setErrors({ [path]: message });
    } else {
      await saveProject(values);
      closeModal();
    }
  }

  return (
    <Callout style={styles.callout} size={Sizes.LARGE}>
      <h3>{!project ? 'Cadastro de Projetos' : project.name}</h3>
      <Formik
        initialValues={project || {}}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, isSubmitting, handleChange, handleSubmit, handleBlur }) => (
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formItem}>
              <label>Nome</label>
              <input
                disabled={readOnly}
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text" />
              {errors['name'] && <b style={styles.error}>{errors['name']}</b>}
            </div>
            <div style={styles.formItem}>
              <label>Descrição</label>
              <input
                disabled={readOnly}
                name="description"
                value={values.description}
                onChange={handleChange} type="text" />
            </div>
            <div style={styles.formItem}>
              <label>Linguagem</label>
              <input
                disabled={readOnly}
                name="language" value={values.language}
                onChange={handleChange}
                type="text" />
            </div>
            <div style={styles.formItem}>
              <label>Lead</label>
              <select disabled={readOnly} name="lead"  value={lead} onChange={e => setLead(e.target.value)}>
                {users && users.map((user, i) =>
                  <option  key={i} value={user.id}>{user.name}</option>
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

export default ProjectForm;