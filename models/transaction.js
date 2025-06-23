const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    shipping_dock_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    discount: { type: DataTypes.FLOAT, allowNull: false },
    tax: { type: DataTypes.FLOAT, allowNull: false },
    total: { type: DataTypes.FLOAT, allowNull: false },
    notes: { type: DataTypes.STRING },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isIn: [[0, 1]] } // 0 = not paid, 1 = paid
    }
  }, {
    tableName: 'transactions'
  });

  return Transaction;
};
