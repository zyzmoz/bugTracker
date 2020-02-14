import knex from 'knex';

const createProjects = async (knexConn : knex) => {
  let tableExists = await knexConn.schema.hasTable('projects');
  if (tableExists) return;

  await knexConn.schema.createTable('projects', table => {
    table.increments();
    table.timestamp('created_at').defaultTo(knexConn.fn.now());
    table.timestamp('updated_at').defaultTo(knexConn.fn.now());
    table.string('name').notNullable();
    table.string('description');
    table.integer('lead');
    table.string('language');
    table.boolean('deleted').defaultTo(false);
  }).catch(err => console.log(err))
}

export default createProjects;