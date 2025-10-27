import expressAsyncHandler from "express-async-handler";
import main from "../../config/gemini.config.js";
import blogModel from "../../models/blog.model.js";
import commentModel from "../../models/comment.model.js";
import CustomError from "../../utils/Error.util.js";
import { uploadImage } from "../../utils/imageKit.util.js";

export const addBlog = expressAsyncHandler(async (req, res, next) => {
  const blogData = JSON.parse(req.body.blog);
  const imageFile = req.file;

  const b64 = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
    "base64"
  )}`;

  const image = await uploadImage(b64);

  const blog = await blogModel.create(
    {
      title: blogData.title,
      subTitle: blogData.subTitle,
      description: blogData.description,
      category: blogData.category,
      isPublished: blogData.isPublished,
      image,
    }
    // { ...req.body, image }
  );

  res.status(201).json({
    success: true,
    message: "Blog added successfully",
    blog,
  });
});

export const deleteBlog = expressAsyncHandler(async (req, res, next) => {
  const blog = await blogModel.findByIdAndDelete(req.params.id);

  if (!blog) return next(new CustomError("No blog found", 404));

  // //? delete image from imagekit:TODO and delete all comments
  // await commentModel.deleteMany({ blogId: blog._id });

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

export const getDashboard = expressAsyncHandler(async (req, res, next) => {
  console.log(123);
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

export const getBlogs = expressAsyncHandler(async (req, res, next) => {
  const blogs = await blogModel.find().sort({ createdAt: -1 });

  if (blogs.length === 0) return next(new CustomError("No blogs found", 404));

  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    blogs,
  });
});

export const getBlog = expressAsyncHandler(async (req, res, next) => {
  const blog = await blogModel.findById(req.params.id);

  if (!blog) return next(new CustomError("No blog found", 404));

  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    blog,
  });
});

export const generateContent = expressAsyncHandler(async (req, res, next) => {
  const prompt = req.body.prompt;
  let response = await main(
    prompt +
      ` Generate a blog content for this topic in simple plain rich text format`
  );

  response = response
    .replace(
      /^.*?(?=TypeScript|JavaScript|React|Next|Node|Mongo|HTML|CSS|Blog|Introduction|In this)/i,
      ""
    )
    .trim();

  res.status(200).json({
    success: true,
    message: "Content generated successfully",
    content: response,
  });
});
