import knex from 'knex';

const createUsers = async (knexConn : knex) => {
  let tableExists = await knexConn.schema.hasTable('users');
  if (tableExists)  return;  
  await knexConn.schema.createTable('users', (table) =>{
    // table.uuid('uid');
    table.increments();
    table.timestamp('created_at').defaultTo(knexConn.fn.now());
    table.timestamp('updated_at').defaultTo(knexConn.fn.now());
    table.string('name');
    table.string('username');
    table.string('password');
    table.string('email');
    table.boolean('deleted').defaultTo(false);
  }).catch(err => console.log('Error:', err));  
}

export default createUsers;