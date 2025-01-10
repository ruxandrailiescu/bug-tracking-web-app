const { sequelize } = require('./models');

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database schema recreated.');
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
}

module.exports = initDB;
