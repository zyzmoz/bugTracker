import { Router } from 'express';
import knex from 'knex';

const userRouter = Router();
let knexConn: knex;

userRouter.get('/', async (req, res) => {
  let rows = await knexConn.table('users').select('*');
  res.json(rows);
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  let rows = await knexConn.table('users').where({ id }).select('*');
  res.json(rows);
});

userRouter.post('/', async (req, res, next) => {
  let data = req.body;  
  if (!data) res.json({ error: 'No data to insert or update' });

  const { id } = data;
  if (id) {    
    await knexConn('users').where({ id }).update({...data, updated_at: knexConn.fn.now()}).catch(err => {
      res.json({ error: err });
      next();
    });
  } else {
    await knexConn('users').insert(data).catch(err => {
      res.json({ error: err });
      next();
    });
  }
  res.json({ status: true });
});


const createUserRouter = (knex) => {
  knexConn = knex;
  return userRouter;
}


export default createUserRouter;