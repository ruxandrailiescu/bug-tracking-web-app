require('dotenv').config();

const express = require('express');
const swaggerUi = require("swagger-ui-express");
const { initialize } = require("express-openapi");
const { 
    sequelize, 
    User, 
    Team, 
    Project,
    UserProject,
    Bug,
    Commit,
    BugHistory
} = require('./db/models');

const app = express();
app.use(express.json());

initialize({
  app,
  apiDoc: require("./api/api-doc"),
  paths: "./api/routes",
});

app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "http://localhost:3030/api-docs",
    },
  })
);

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
  
      await sequelize.sync({ alter: true });
      console.log('Models synchronized with the database.');
  
      const PORT = 3030;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Error initializing the app:', error);
      process.exit(1);
    }
  })();

  process.on('SIGINT', async () => {
    try {
      await sequelize.close();
      console.log('Database connection closed due to app termination.');
      process.exit(0);
    } catch (error) {
      console.error('Error closing the database connection: ', error);
      process.exit(1);
    }
  });

  module.exports = app;