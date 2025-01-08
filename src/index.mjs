import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.mjs";
import mongoose from "mongoose";

dotenv.config();
const app = express();

mongoose
  .connect("mongodb://localhost:27017/bug_tracking_app")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
