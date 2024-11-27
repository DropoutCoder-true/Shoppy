import { Product } from "../models/Product.js";
import { rm } from "fs";

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
    const { search, category, price, page } = req.query;
    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (price) {
      filter.price = {
        $gte: Number(price), // to filter products which are greater than the price
      };
    }

    if (category) filter.category = category;

    const countProducts = await Product.countDocuments(); // to give a count of all products
    const limit = 4; // to display 4 products in one page
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(countProducts / limit);

    const products = await Product.find(filter)
      .sort("-createdAt")
      .limit(limit)
      .skip(skip);

    const categories = await Product.distinct("category"); // this will give all the distinct categories
    const mostSelling = await Product.find().sort({ sold: -1 }).limit(3); // this is just to show our top 3 best selling products

    res.status(200).json({
      products,
      totalPages,
      categories,
      mostSelling,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }
    const product = await Product.findById(req.params.id);
    const { stock } = req.body;
    if (stock) {
      product.stock = stock;
      await product.save();
      return res.status(200).json({ message: "Stock Updated" });
    }

    res.status(400).json({
      message: "Please enter the stock value",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }
    const product = await Product.findById(req.params.id);
    rm(product.image, () => {
      console.log("Image Deleted"); // this is to delete an image from uploads folder
    });

    await product.deleteOne();
    res.status(200).json({
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
