const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL, // comes from heroku addons
};

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
);

module.exports = pool;
