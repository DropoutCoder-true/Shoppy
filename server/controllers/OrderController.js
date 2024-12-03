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
      `Thanks for shopping of ${subTotal} from our Platform your order will be delivered soon`
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
