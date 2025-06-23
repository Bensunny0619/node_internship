const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;

// Sync database then start server
db.sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database synced');
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });

}).catch((err) => {
  console.error('❌ Error syncing database:', err);
});
