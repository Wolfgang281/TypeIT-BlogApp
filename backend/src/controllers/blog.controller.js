import expressAsyncHandler from "express-async-handler";
import blogModel from "../models/blog.model";
import CustomError from "../utils/Error.util.js";
import { uploadImage } from "../utils/imageKit.util.js";

export const addBlog = expressAsyncHandler(async (req, res, next) => {
  // console.log(req.body);
  console.log(req.file);
  const { title, subTitle, description, category, isPublished } = req.body;
  const imageFile = req.file;

  const b64 = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
    "base64"
  )}`;

  const image = await uploadImage(b64);
  console.log(image);

  const blog = await blogModel.create({
    title,
    subTitle,
    description,
    category,
    isPublished,
    image,
  });

  res.status(201).json({
    success: true,
    message: "Blog added successfully",
    blog,
  });
});

export const getBlogs = expressAsyncHandler(async (req, res, next) => {
  const blogs = await blogModel.find({ isPublished: true });

  if (blogs.length === 0) return next(new CustomError("No blogs found", 404));

  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    blogs,
  });
});

export const getBlog = expressAsyncHandler(async (req, res, next) => {
  const blog = await blogModel.findOne({
    _id: req.params.id,
    isPublished: true,
  });

  if (!blog) return next(new CustomError("No blog found", 404));

  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    blog,
  });
});

export const deleteBlog = expressAsyncHandler(async (req, res, next) => {
  const blog = await blogModel.findByIdAndDelete(req.params.id);

  if (!blog) return next(new CustomError("No blog found", 404));

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

export const updateBlog = expressAsyncHandler(async (req, res, next) => {
  const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!blog) return next(new CustomError("No blog found", 404));

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    blog,
  });
});

export const togglePublish = expressAsyncHandler(async (req, res, next) => {
  const blog = await blogModel.findById(req.params.id);

  if (!blog) return next(new CustomError("No blog found", 404));

  blog.isPublished = !blog.isPublished;
  await blog.save();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    blog,
  });
});
