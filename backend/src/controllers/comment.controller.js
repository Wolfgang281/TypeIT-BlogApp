import expressAsyncHandler from "express-async-handler";
import commentModel from "../models/comment.model";

export const addComment = expressAsyncHandler(async (req, res, next) => {
  const { blogId, name, content } = req.body;

  const comment = await commentModel.create({
    blogId,
    name,
    content,
  });

  res.status(201).json({
    success: true,
    message: "Comment added for review",
    comment,
  });
});

export const getBlogComments = expressAsyncHandler(async (req, res, next) => {
  const comments = await commentModel
    .find({
      blogId: req.params.id,
      isApproved: true,
    })
    .sort({ createdAt: -1 });

  if (comments.length === 0)
    return next(new CustomError("No comments found", 404));

  res.status(200).json({
    success: true,
    message: "Comments fetched successfully",
    comments,
  });
});
