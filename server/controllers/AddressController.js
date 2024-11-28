import { Address } from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, phone } = req.body;

    await Address.create({
      address,
      phone,
      user: req.user._id,
    });

    res.status(200).json({ message: "Address Added" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};