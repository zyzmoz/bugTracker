import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { resolve } from 'path';
import { config } from 'dotenv';
import knex from 'knex';
import createUsers from './schemas/users';
import createUserRouter from './routes/users-route';
import createCustomers from './schemas/customers';
import createCustomerRouter from './routes/customers-route';

config({ path: resolve(__dirname, '../.env') });

const knexConn = knex({
  client: 'sqlite3',
  connection: () => ({
    filename: process.env.SQLITE_FILENAME
  }),
  useNullAsDefault: true
});

//Try to create database
createUsers(knexConn);
createCustomers(knexConn);

const app = express();
app.use(bodyParser());
app.use(cors());

app.use('/users', createUserRouter(knexConn));
app.use('/customers', createCustomerRouter(knexConn));

app.get('/', async (req, res) => {
  
  res.json({api: 'OK'});

});

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`Server is listening on 3000`);
});