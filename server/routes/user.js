import express from "express";
import { registerUser, verifyUser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/verify", verifyUser);

export default router;
