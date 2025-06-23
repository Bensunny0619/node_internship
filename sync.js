const sequelize = require('./config/database');
const Transaction = require('./models/transaction');

sequelize.sync({ alter: true })  // Use { force: true } to drop and recreate
  .then(() => {
    console.log('Transaction table created or updated!');
    process.exit();
  })
  .catch((err) => {
    console.error('Error syncing with DB:', err);
    process.exit(1);
  });