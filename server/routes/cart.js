import express from "express";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCart,
} from "../controllers/CartController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/cart/new", isAuth, addToCart);
router.get("/cart/all", isAuth, fetchCart);
router.delete("/cart/:id", isAuth, removeFromCart);
router.put("/cart", isAuth, updateCart);

export default router;
