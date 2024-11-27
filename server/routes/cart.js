import express from "express";
import { addToCart, fetchCart } from "../controllers/CartController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/cart/new", isAuth, addToCart);
router.get("/cart/all", isAuth, fetchCart);

export default router;
