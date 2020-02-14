import React, { useState } from 'react';
import { Button, Callout, Sizes } from 'react-foundation';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  name: Yup.string().nullable(),
  email: Yup.string().nullable(),
  username: Yup.string().min(6, 'Usuário deve conter 6 ou mais caracteres!')
    .required('O campo usuário é obrigatório!'),
  password: Yup.string()
    .min(6, 'Senha deve conter 6 ou mais caracteres!')
    .required('O campo senha é obrigatório!'),
});

const UserForm = (props) => {
  const [errors, setErrors] = useState({})
  const { user, closeModal, saveUser, readOnly } = props;


  const handleSubmit = async (values) => {       
    setErrors({});
    const { message, path, errors } = await UserSchema.validate(values).catch(err => err);

    if (errors) {
      setErrors({ [path]: message });

    } else {
      await saveUser(values);
      closeModal();
    }
  }

  return (
    <Callout style={styles.callout} size={Sizes.LARGE}>
      <h3>{!user ? 'Cadastro de Técnicos' : user.name}</h3>
      <Formik 
        initialValues={user}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, isSubmitting, handleChange, handleSubmit }) => (
          <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formItem}>
            <label >Nome</label>
            <input disabled={readOnly} name="name" value={values.name} onChange={handleChange} type="text" />
          </div>
          <div style={styles.formItem}>
            <label >Usuário</label>
            <input disabled={readOnly} name="username" value={values.username} onChange={handleChange} type="text" />
            {errors['username'] && <b style={styles.error}>{errors['username']}</b>}
          </div>
          <div style={styles.formItem}>
            <label >Email</label>
            <input disabled={readOnly} name="email" value={values.email} onChange={handleChange} type="text" />
          </div>
          <div style={styles.formItem}>
            <label >Senha</label>
            <input disabled={readOnly} name="password" value={values.password} onChange={handleChange} type="password" />
            {errors['password'] && <b style={styles.error}>{errors['password']}</b>}
          </div>

          <div style={styles.actions}>
            <Button disabled={readOnly || isSubmitting} type="submit" >Gravar</Button>
            <Button color="alert" type="cancel" onClick={() => closeModal()}>{readOnly ? 'Fechar' : 'Cancelar'}</Button>
          </div>
        </form>)}
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
    width:'100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  error: {
    padding: '0',
    margin: '0',
    color: '#cc4b37'
  }
}

export default UserForm;