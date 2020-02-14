import { Router } from 'express';
import knex from 'knex';
import createCustomersTable from '../schemas/customers';

const customerRouter = Router();
let knexConn: knex;

customerRouter.get('/', async (req, res) => {  
  const { name } = req.query;
  let rows = await knexConn.table('customers').whereNot({deleted: true}).select('*');  
  if (name) {
    rows = rows.filter(row => row.name.includes(name)? row: null);
  }
  res.json(rows);
});

customerRouter.get('/query', async (req, res) => {  
  const { name } = req.query;
  console.log(name)
  let rows = await knexConn.table('customers').whereNot({deleted: true}).select('*');
  
  res.json(rows);
});

customerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  let rows = await knexConn.table('customers').where({ id }).whereNot({deleted: true}).select('*');
  res.json(rows);
});


customerRouter.post('/', async (req, res, next) => {
  let data = req.body;  
  if (!data) res.json({ error: 'No data to insert or update' });

  const { id } = data;
  if (id) {    
    await knexConn('customers').where({ id }).update({...data, updated_at: knexConn.fn.now()}).catch(err => {
      res.json({ error: err });
      next();
    });
  } else {
    await knexConn('customers').insert(data).catch(err => {
      res.json({ error: err });
      next();
    });
  }
  res.json({ status: true });
});


const createCustomerRouter = (knex) => {
  createCustomersTable(knex);
  knexConn = knex;
  return customerRouter;
}

export default createCustomerRouter;