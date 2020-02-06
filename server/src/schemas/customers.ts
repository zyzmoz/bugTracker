import knex from 'knex';

const createCustomers = async (knexConn : knex) => {
  let tableExists = await knexConn.schema.hasTable('customers');
  if (tableExists) return;

  await knexConn.schema.createTable('customers', table => {
    table.increments();
    table.timestamp('created_at').defaultTo(knexConn.fn.now());
    table.timestamp('updated_at').defaultTo(knexConn.fn.now());
    table.string('name').notNullable();
    table.string('business_name');
    table.string('email');
    table.string('address');
    table.string('city');
    table.string('state');
    table.string('fone');
    table.string('contact');    
    table.string('website');
    table.string('govId');
    table.string('localId');
  }).catch(err => console.log('Error:', err));
}

export default createCustomers;