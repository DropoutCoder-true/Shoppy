import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
  connectDb();
});
