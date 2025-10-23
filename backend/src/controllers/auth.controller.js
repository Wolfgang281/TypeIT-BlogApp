import expressAsyncHandler from "express-async-handler";
import CustomError from "../utils/Error.util.js";
import { generateToken } from "../utils/jwt.util.js";
import userModel from "../models/user.model.js";

export const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (!existingUser) return next(new CustomError("Invalid credentials", 401));

  let isMatch = await existingUser.matchPassword(password);
  if (!isMatch) return next(new CustomError("Invalid credentials", 401));

  let token = generateToken(existingUser._id);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

export const logout = expressAsyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout successful",
    });
});
