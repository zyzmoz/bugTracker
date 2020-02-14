import { Router } from 'express';
import knex from 'knex';
import createProjects from '../schemas/projects';

const projectRouter = Router();
let knexConn: knex;

projectRouter.get('/', async (req, res) => {
  const { name } = req.query;
  let rows = await knexConn.table('projects')
    .whereNot({ 'projects.deleted': true })
    .select(['projects.*', 'users.name as leadName'])
    .leftJoin('users', 'users.id', 'projects.lead');
  if (name) {
    rows = rows.filter(row => row.name.includes(name) ? row : null);
  }
  res.json(rows);
});

projectRouter.get('/query', async (req, res) => {
  const { name } = req.query;
  console.log(name)
  let rows = await knexConn.table('projects')
    .whereNot({ 'projects.deleted': true })
    .select(['projects.*', 'users.name as leadName'])
    .leftJoin('users', 'users.id', 'projects.lead');


  res.json(rows);
});

projectRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  let rows = await knexConn.table('projects')
    .where({ 'projects.id': id })
    .whereNot({ 'projects.deleted': true })
    .select(['projects.*', 'users.name as leadName'])
    .leftJoin('users', 'users.id', 'projects.lead');
    
  res.json(rows);
});


projectRouter.post('/', async (req, res, next) => {
  let data = req.body;
  if (!data) res.json({ error: 'No data to insert or update' });

  const { id } = data;
  if (id) {
    await knexConn('projects').where({ id }).update({ ...data, updated_at: knexConn.fn.now() }).catch(err => {
      res.json({ error: err });
      next();
    });
  } else {
    await knexConn('projects').insert(data).catch(err => {
      res.json({ error: err });
      next();
    });
  }
  res.json({ status: true });
});

const createProjectRouter = (knex) => {
  createProjects(knex);
  knexConn = knex;
  return projectRouter;
}


export default createProjectRouter;