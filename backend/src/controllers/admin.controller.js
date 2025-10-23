import expressAsyncHandler from "express-async-handler";
import CustomError from "../utils/Error.util.js";
import { generateToken } from "../utils/jwt.util.js";
import userModel from "../models/user.model.js";
import commentModel from "../models/comment.model.js";

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

export const getAllBlogs = expressAsyncHandler(async (req, res, next) => {
  const blogs = await blogModel.find().sort({ createdAt: -1 });

  if (blogs.length === 0) return next(new CustomError("No blogs found", 404));

  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    blogs,
  });
});

export const getAllComments = expressAsyncHandler(async (req, res, next) => {
  const comments = await commentModel
    .find()
    .sort({ createdAt: -1 })
    .populate({ blogId });

  if (comments.length === 0)
    return next(new CustomError("No comments found", 404));

  res.status(200).json({
    success: true,
    message: "Comments fetched successfully",
    comments,
  });
});

export const getDashboard = expressAsyncHandler(async (req, res, next) => {
  const recentBlogs = await blogModel.find().sort({ createdAt: -1 }).limit(5);
  let blogs = await blogModel.countDocuments();
  let comments = await commentModel.countDocuments();
  let drafts = await blogModel.countDocuments({ isPublished: false });

  if (recentBlogs.length === 0)
    return next(new CustomError("No recent blogs found", 404));

  res.status(200).json({
    success: true,
    message: "Dashboard fetched successfully",
    recentBlogs,
    blogs,
    comments,
    drafts,
  });
}); // dashboard

export const deleteComment = expressAsyncHandler(async (req, res, next) => {
  const id = req.body;
  const comment = await commentModel.findByIdAndDelete(id);

  if (!comment) return next(new CustomError("No comment found", 404));

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});

export const approveComment = expressAsyncHandler(async (req, res, next) => {
  const id = req.body;
  const comment = await commentModel.findByIdAndUpdate(id, {
    isApproved: true,
  });

  if (!comment) return next(new CustomError("No comment found", 404));

  res.status(200).json({
    success: true,
    message: "Comment approved successfully",
  });
});
