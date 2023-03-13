import knex from 'knex';

const Connection = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '3590',
    database: 'apiusers'
  }
})

export default Connection;