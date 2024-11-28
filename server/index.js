import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/uploads", express.static("uploads")); // helps to fetch urls from server urls

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
  connectDb();
});
