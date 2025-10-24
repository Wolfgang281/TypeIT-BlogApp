import expressAsyncHandler from "express-async-handler";
import blogModel from "../../models/blog.model.js";
import CustomError from "../../utils/Error.util.js";

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
