import express from "express";
import {
  addAddress,
  fetchAllAddress,
} from "../controllers/AddressController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/address/new", isAuth, addAddress);
router.get("/address/all", isAuth, fetchAllAddress);

export default router;
