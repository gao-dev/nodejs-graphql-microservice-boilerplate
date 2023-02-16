const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../srv/.env') });

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.SQLDATABASE,
  process.env.SQLUSER,
  process.env.SQLPASSWORD,
  {
    host: process.env.SQLHOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      underscored: true
    }
  }
);  

module.exports = sequelize;
