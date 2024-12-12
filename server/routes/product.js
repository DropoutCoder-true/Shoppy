import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createProduct,
  deleteProduct,
  fetchProductAdmin,
  fetchProducts,
  fetchSingleProduct,
  updateStock,
} from "../controllers/ProductController.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/product/new", isAuth, uploadFiles, createProduct);
router.get("/product/all", fetchProducts);
router.get("/product/admin/all", fetchProductAdmin);
router.get("/product/:id", fetchSingleProduct);
router.put("/product/:id", isAuth, updateStock);
router.delete("/product/:id", isAuth, deleteProduct);

export default router;
