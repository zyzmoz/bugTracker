import { Router } from 'express';
import knex from 'knex';
import { createIssues } from '../schemas/issues';


const issueRouter = Router();
let knexConn: knex;

//Return only issues header filtering
issueRouter.get('/', async (req, res) => {
  const filter = req.query;
  let rows = await knexConn.table('issues')
    .select('*');

  if (filter) {
    Object.keys(filter).map(key => {
      rows = rows.filter(row => {
        if (isNaN(filter[key])) {
          return row[key].includes(filter[key]) ? row : null;
        } else {
          return row[key] == filter[key] ? row : null;
        }
      });
    });
  }
  res.json(rows);
});

//Return issue with details
issueRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  let issue = await knexConn.table('issues')
    .select('*');
  let issueDetails = await knexConn.table('issue_details')
    .where({ issue_id: id })
    .select('*');
  res.json({
    ...issue[0],
    details: issueDetails
  });
});

//save new issue

// customerRouter.post('/', async (req, res, next) => {
//   let data = req.body;
//   if (!data) res.json({ error: 'No data to insert or update' });

//   const { id } = data;
//   if (id) {
//     await knexConn('customers').where({ id }).update({ ...data, updated_at: knexConn.fn.now() }).catch(err => {
//       res.json({ error: err });
//       next();
//     });
//   } else {
//     await knexConn('customers').insert(data).catch(err => {
//       res.json({ error: err });
//       next();
//     });
//   }
//   res.json({ status: true });
// });


const createIssuesRouter = (knex) => {
  createIssues(knex);
  knexConn = knex;
  return issueRouter;
}

export default createIssuesRouter;