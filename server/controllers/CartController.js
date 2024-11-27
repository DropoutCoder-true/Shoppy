import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { product } = req.body;

    const cart = await Cart.findOne({
      product: product,
      user: req.user._id,
    }).populate("product");

    if (cart) {
      if (cart.product.stock === cart.quantity)
        return res.status(400).json({
          message: "Out of Stock",
        });
      cart.quantity = cart.quantity + 1;
      await cart.save();
      return res.status(200).json({
        message: "Added To Cart",
      });
    }

    const cartProd = await Product.find({ product });

    if (cartProd.stock == 0) {
      return res.status(400).json({
        message: "Out of Stock",
      });
    }

    await Cart.create({
      quantity: 1,
      product: product,
      user: req.user._id,
    });

    req.status(200).json({ message: "Added to Cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
