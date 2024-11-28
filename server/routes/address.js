import express from "express";
import { addAddress } from "../controllers/AddressController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/address/new", isAuth, addAddress);

export default router;
