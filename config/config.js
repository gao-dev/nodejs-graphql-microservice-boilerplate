const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  development: {
    database: process.env.SQLDATABASE,
    username: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    host: process.env.SQLHOST,
    dialect: 'mysql'
  },
  test: {
    database: process.env.SQLDATABASE,
    username: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    host: process.env.SQLHOST,
    dialect: 'mysql'
  },
  production: {
    database: process.env.SQLDATABASE,
    username: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    host: process.env.SQLHOST,
    dialect: 'mysql'
  }
};
