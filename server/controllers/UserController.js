import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/SendMail.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User Already Exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    user = {
      email,
      name,
      password: hashPassword,
    };

    const otp = Math.floor(Math.random() * 1000000);
    const activationToken = jwt.sign(
      { user, otp },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      }
    );

    await sendMail(
      email,
      "OTP Verification",
      `Please enter the OTP to verify yourself. Here's your OTP: ${otp}`
    );

    res
      .status(200)
      .json({ message: "OTP send to your email address.", activationToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;
    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

    if (!verify) return res.status(400).json({ message: "OTP Expired" });

    if (verify.otp !== otp)
      return res.status(400).json({ message: "Incorrect OTP" });

    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.password,
    });

    res.status(200).json({
      message: "User Registered",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(400).json({ message: "Incorrect Password!" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    res.status(200).json({
      message: `Welcome Back ${user.name}`,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
