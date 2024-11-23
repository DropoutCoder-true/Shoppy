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
      process.env.ACTIVATION_SECRET
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
