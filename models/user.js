const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wallet_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  return User;
};
