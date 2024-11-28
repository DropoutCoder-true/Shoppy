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

export const fetchAllAddress = async (req, res) => {
  try {
    const allAdd = await Address.find({});

    res.status(200).json({ allAdd });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
