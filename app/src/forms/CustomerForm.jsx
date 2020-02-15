import React, { useState } from 'react';
import { Button, Callout, Sizes } from 'react-foundation';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CustomerSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  name: Yup.string().required('O campo nome é obrigatório!'),
  business_name: Yup.string().nullable(),
  email: Yup.string().required('O campo email é obrigatório!'),
  address: Yup.string().nullable(),
  city: Yup.string().nullable(),
  state: Yup.string().nullable(),
  phone: Yup.string().required('O campo telefone é obrigatório!'),
  contact: Yup.string().required('O campo contato é obrigatório!'),
  website: Yup.string().nullable()
  //   table.string('govId');
  //   table.string('localId');
});

const CustomerForm = ({ customer, closeModal, saveCustomer, readOnly }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (values) => {
    setErrors({});
    const { message, path, errors } = await CustomerSchema.validate(values);

    if (errors) {
      setErrors({ [path]: message });
    } else {
      await saveCustomer(values);
      closeModal();
    }
  }

  return (
    <Callout style={styles.callout} size={Sizes.LARGE}>
      <h3>{!customer ? 'Cadastro de Clientes' : customer.name}</h3>
      <Formik
        initialValues={customer || {}}
        onSubmit={(values => handleSubmit(values))}
      >
        {({values, isSubmitting, handleChange, handleSubmit}) => (
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formItem}>
              <label>Nome</label>
              <input 
                disabled={readOnly}
                name="name" value={values.name}
                onChange={handleChange}
                type="text"/>
              {errors['name'] && <b style={styles.error}>{errors['name']}</b>}
            </div>

            <div style={styles.formItem}>
              <label>Razão Social</label>
              <input 
                disabled={readOnly}
                name="business_name" value={values.business_name}
                onChange={handleChange}
                type="text"/>              
            </div>

            <div style={styles.formItem}>
              <label>Email</label>
              <input 
                disabled={readOnly}
                name="email" value={values.email}
                onChange={handleChange}
                type="text"/>
              {errors['email'] && <b style={styles.error}>{errors['email']}</b>}
            </div>

            <div style={styles.formItem}>
              <label>Endereço</label>
              <input 
                disabled={readOnly}
                name="address" value={values.address}
                onChange={handleChange}
                type="text"/>
            </div>

            <div style={styles.formItem}>
              <label>Cidade</label>
              <input 
                disabled={readOnly}
                name="city" value={values.city}
                onChange={handleChange}
                type="text"/>
            </div>

            <div style={styles.formItem}>
              <label>State</label>
              <input 
                disabled={readOnly}
                name="state" value={values.state}
                onChange={handleChange}
                type="text"/>
            </div>

            <div style={styles.formItem}>
              <label>Telefone</label>
              <input 
                disabled={readOnly}
                name="phone" value={values.phone}
                onChange={handleChange}
                type="text"/>
              {errors['phone'] && <b style={styles.error}>{errors['phone']}</b>}
            </div>

            <div style={styles.formItem}>
              <label>Contato</label>
              <input 
                disabled={readOnly}
                name="contact" value={values.contact}
                onChange={handleChange}
                type="text"/>
              {errors['contact'] && <b style={styles.error}>{errors['contact']}</b>}
            </div>

            <div style={styles.formItem}>
              <label>Site</label>
              <input 
                disabled={readOnly}
                name="website" value={values.website}
                onChange={handleChange}
                type="text"/>
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

export default CustomerForm;

