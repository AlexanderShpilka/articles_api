const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'Freedom13$Autumn2017',
  database: 'articles_database',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
