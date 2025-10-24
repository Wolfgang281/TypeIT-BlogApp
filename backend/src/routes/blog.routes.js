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
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.post("/add", authenticate, authorize, upload.single("image"), addBlog);
router.get("/all", getBlogs);
router.patch("/update-publish/:id", authenticate, authorize, togglePublish);
router.get("/:id", getBlog);
router.patch("/:id", authenticate, authorize, updateBlog);
router.delete("/:id", authenticate, authorize, deleteBlog);

export default router;
