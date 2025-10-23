import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);

//! we define and use a model, not a collection, because the model is an abstraction layer built on top of the MongoDB collection. The model connects a defined schema to the actual collection, allowing us to perform CRUD operations with validation, middleware, and other Mongoose features. Internally, Mongoose automatically maps the model name (e.g., "Comment") to the corresponding collection name ("comments") in MongoDB.
