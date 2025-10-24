import expressAsyncHandler from "express-async-handler";
import commentModel from "../../models/comment.model.js";
import CustomError from "../../utils/Error.util.js";

export const getAllComments = expressAsyncHandler(async (req, res, next) => {
  const comments = await commentModel
    .find()
    .sort({ createdAt: -1 })
    .populate({ path: "blogId" });

  if (comments.length === 0)
    return next(new CustomError("No comments found", 404));

  res.status(200).json({
    success: true,
    message: "Comments fetched successfully",
    comments,
  });
});

export const deleteComment = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const comment = await commentModel.findByIdAndDelete(id);

  if (!comment) return next(new CustomError("No comment found", 404));

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});

export const approveComment = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const comment = await commentModel.findByIdAndUpdate(id, {
    isApproved: true,
  });

  if (!comment) return next(new CustomError("No comment found", 404));

  res.status(200).json({
    success: true,
    message: "Comment approved successfully",
  });
});
