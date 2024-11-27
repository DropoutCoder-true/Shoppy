import express from "express";
import { addToCart } from "../controllers/CartController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/cart/new", isAuth, addToCart);

export default router;
