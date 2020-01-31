import React, { useState, useEffect } from 'react';
import { Button, Callout, Sizes, Colors } from 'react-foundation';
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
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({})
  const { user, closeModal, saveUser, readOnly } = props;

  useEffect(() => {
    if (user) setFormData(user);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async () => {
    setErrors({});
    const { message, path, errors } = await UserSchema.validate(formData).catch(err => err);

    if (errors) {
      setErrors({[path]: message});     

    } else {
      await saveUser(formData);
      closeModal();
    } 

  }

  return (
    <Callout style={styles.callout} size={Sizes.LARGE}>
      <h3>{!user ? 'Cadastro de Técnicos' : user.name}</h3>
      <div style={styles.form}>
        <div style={styles.formItem}>
          <label >Nome</label>
          <input disabled={readOnly} name="name" value={user && formData.name} onChange={e => handleChange(e)} type="text" />          
        </div>
        <div style={styles.formItem}>
          <label >Usuário</label>
          <input disabled={readOnly} name="username" value={user && formData.username} onChange={e => handleChange(e)} type="text" />
          {errors['username'] && <b style={styles.error}>{errors['username']}</b>}
        </div>
        <div style={styles.formItem}>
          <label >Email</label>
          <input disabled={readOnly} name="email" value={user && formData.email} onChange={e => handleChange(e)} type="text" />
        </div>
        <div style={styles.formItem}>
          <label >Senha</label>
          <input disabled={readOnly} name="password" value={user && formData.password} onChange={e => handleChange(e)} type="password" />
          {errors['password'] && <b style={styles.error}>{errors['password']}</b>}
        </div>
      </div>

      <div style={styles.actions}>
        <Button disabled={readOnly} onClick={() => handleSubmit()}>Gravar</Button>
        <Button color="alert" onClick={() => closeModal()}>{readOnly? 'Fechar': 'Cancelar'}</Button>
      </div>
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