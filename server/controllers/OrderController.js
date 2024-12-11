import { Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import sendMail from "../middlewares/SendMail.js";

export const newOrderCod = async (req, res) => {
  try {
    const { method, phone, address } = req.body;
    const cart = await Cart.find({ user: req.user._id }).populate("product");

    let subTotal = 0;
    cart.forEach((i) => {
      const itemSubTotal = i.product.price * i.quantity;
      subTotal += itemSubTotal;
    });

    const items = await Cart.find({ user: req.user._id })
      .select("-_id")
      .select("-user")
      .select("-__v");

    const order = await Order.create({
      items,
      method,
      user: req.user._id,
      phone,
      address,
      subTotal,
    });

    for (let i of order.items) {
      let product = await Product.findOne({ _id: i.product });
      product.$inc("stock", -1 * i.quantity);
      product.$inc("sold", +i.quantity);
      await product.save();
    }

    await Cart.find({ user: req.user._id }).deleteMany();
    await sendMail(
      req.user.email,
      "Let's negotiate",
      `Thanks for shopping of ${subTotal} from our Platform your order will be delivered soon`,
    );

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "This is an admin route",
      });
    }

    const order = await Order.findById(req.params.id);
    console.log(order.status);
    if (order.status === "Pending") {
      order.status = "Processing";

      await sendMail(
        req.user.email,
        "Shoppy",
        "Your order is in processing, and it will be delivered soon",
      );

      await order.save();

      return res.json({ message: "Order Status Updated!" });
    }

    if (order.status === "Processing") {
      order.status = "Shipped";

      await sendMail(
        req.user.email,
        "Shoppy",
        "Your Order has been shipped, and will reach to your destination ASAP.",
      );

      await order.save();

      return res.json({ message: "Order Status Updated!" });
    }

    if (order.status === "Shipped") {
      order.status = "Out for Delivery";

      await sendMail(
        req.user.email,
        "Shoppy",
        "Your Order is out for delivery.",
      );

      await order.save();

      return res.json({ message: "Order Status Updated!" });
    }

    if (order.status === "Out for Delivery") {
      order.status = "Delivered";

      await sendMail(
        req.user.email,
        "Shoppy",
        "Your Order has been delivered. Thanks for Shopping with Shoppy",
      );

      await order.save();

      return res.status(200).json({ message: "Order Status Updated!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
