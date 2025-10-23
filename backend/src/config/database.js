import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

export const connectDB = expressAsyncHandler(async () => {
  let client = await mongoose.connect(process.env.MONGO_URL);
  console.log(`Database connected to: ${client.connection.host}`);
});
