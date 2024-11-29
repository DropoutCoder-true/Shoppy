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
    const allAdd = await Address.find({ user: req.user._id });

    res.status(200).json({ allAdd });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleAddress = async (req, res) => {
  try {
    const add = await Address.findById(req.params.id);
    res.status(200).json({ add });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const add = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    await add.deleteOne();

    res.status(200).json({
      message: "Address Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
