import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  togglePublish,
  updateBlog,
} from "../controllers/blog.controller";
import upload from "../middlewares/multer.middleware";

const router = Router();

router.post("/add", upload.single("image"), addBlog);
router.get("/all", getBlogs);
router.patch("/update-publish/:id", togglePublish);
router.get("/:id", getBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
