import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
  connectDb();
});
