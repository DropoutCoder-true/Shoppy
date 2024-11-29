import express from "express";
import {
  addAddress,
  deleteAddress,
  fetchAllAddress,
  getSingleAddress,
} from "../controllers/AddressController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/address/new", isAuth, addAddress);
router.get("/address/all", isAuth, fetchAllAddress);
router.get("/address/:id", isAuth, getSingleAddress);
router.delete("/address/:id", isAuth, deleteAddress);

export default router;
