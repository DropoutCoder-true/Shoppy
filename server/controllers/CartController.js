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

    const cartProd = await Product.findById(product);

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

    res.status(200).json({ message: "Added to Cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate("product");
    const sumOfQuantities = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    let subTotal = 0;

    cart.forEach((i) => {
      const itemSubTotal = i.product.price * i.quantity;
      subTotal += itemSubTotal;
    });

    res.status(200).json({ cart, sumOfQuantities, subTotal });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    await cart.deleteOne();

    res.status(200).json({
      message: "Item Deleted From Cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { action } = req.query;

    if (action === "inc") {
      const { id } = req.body;
      const cart = await Cart.findById(id).populate("product");

      if (cart.quantity < cart.product.stock) {
        cart.quantity++;
        await cart.save();
      } else {
        res.status(400).json({
          message: "Out of Stock",
        });
      }
      res.status(200).json({ message: "Cart Updated" });
    }

    if (action === "dec") {
      const { id } = req.body;
      const cart = await Cart.findById(id).populate("product");

      if (cart.quantity > 1) {
        cart.quantity--;
        await cart.save();
      } else {
        return res.status(400).json({
          message: "You have only one item",
        });
      }

      res.status(200).json({
        message: "Cart Updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
