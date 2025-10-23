// uploadImage.js
import expressAsyncHandler from "express-async-handler";
import imagekit from "../config/imageKit.config.js";

export const uploadImage = expressAsyncHandler(async (file) => {
  const response = await imagekit.upload({
    file, // base64 data string
    fileName: `blog-${Date.now()}.webp`,
    folder: "/blogs",
  });

  return response.url;
});
