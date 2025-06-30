const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.sequelize = sequelize;

// Load models
db.User = require('./user')(sequelize, DataTypes);

// Sync database
sequelize.sync({ alter: true })
  .then(() => console.log('✅ DB Synced'))
  .catch(err => console.error('❌ Sync Error:', err));

module.exports = db;