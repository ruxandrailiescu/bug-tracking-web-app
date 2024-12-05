require('dotenv').config();

const express = require('express');
const sequelize = require('./db/db');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Bug Tracking App!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
    try {
      await sequelize.close();
      console.log('Database connection closed due to app termination.');
      process.exit(0);
    } catch (error) {
      console.error('Error closing the database connection:', error);
      process.exit(1);
    }
  });