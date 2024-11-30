import express from "express";
import { newOrderCod } from "../controllers/OrderController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/order/new/cod", isAuth, newOrderCod);

export default router;
