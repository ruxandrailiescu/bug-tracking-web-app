require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { initialize } = require('express-openapi');
const initDB = require('./db/init');

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
      await initDB();
      const PORT = process.env.PORT || 3030;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`API docs available at http://localhost:${PORT}/api-documentation`);
      });
    } catch (error) {
      console.error('Error initializing the app: ', error);
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