import express from "express";
import {
  getAllOrder,
  getMyOrder,
  newOrderCod,
  updateStatus,
} from "../controllers/OrderController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/order/new/cod", isAuth, newOrderCod);
router.get("/order/:id", isAuth, getMyOrder);
router.put("/order/:id", isAuth, updateStatus);
router.get("/order/all", isAuth, getAllOrder);

export default router;
