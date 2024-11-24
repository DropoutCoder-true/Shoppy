import { Product } from "../models/Product.js";

export const createProduct = async (req, res) => {
  // this is an admin route because only admin can create products
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Unauthorized" });

    const { title, description, stock, price, category, sold } = req.body;
    const image = req.file;
    if (!image) return res.status(400).json({ message: "Please add Image" });

    const product = await Product.create({
      title,
      description,
      stock,
      price,
      category,
      sold,
      image: image?.path,
    });

    res.status(201).json({ message: "Product Created!!", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
