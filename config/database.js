const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('day_1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
