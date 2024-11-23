import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/User";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.status(403).json({
        message: "Please Login...",
      });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    res.status(403).json({
      message: "Please Login",
    });
  }
};