import knex from 'knex';

const createIssuesTable = async(knexConn : knex) =>{
  let tableExists = await knexConn.schema.hasTable('issues');
  if (tableExists) return;

  await knexConn.schema.createTable('issues', table => {
    table.increments();
    table.timestamp('created_at').defaultTo(knexConn.fn.now());
    table.timestamp('updated_at').defaultTo(knexConn.fn.now());
    table.string('description');
    table.integer('customer_id').notNullable();
    table.integer('user_id').notNullable();
    table.integer('project_id').notNullable();
    table.integer('status').defaultTo(0);   
    table.boolean('deleted').defaultTo(false);
  }).catch(err => console.log(err));
}

const createIssueDetailsTable = async(knexConn: knex) => {
  let tableExists = await knexConn.schema.hasTable('issue_details');
  if (tableExists) return;

  await knexConn.schema.createTable('issue_details', table => {
    table.increments();
    table.timestamp('created_at').defaultTo(knexConn.fn.now());
    table.timestamp('updated_at').defaultTo(knexConn.fn.now());
    table.integer('issue_id').notNullable();
    table.integer('user_id').notNullable();
    table.string('description');
  });
}

export const createIssues = (knexConn: knex) => {
  createIssuesTable(knexConn);
  createIssueDetailsTable(knexConn);
}

