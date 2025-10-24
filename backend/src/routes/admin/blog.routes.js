import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getDashboard,
  togglePublish,
  updateBlog,
} from "../../controllers/admin/blog.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", authenticate, authorize, upload.single("image"), addBlog);
router.get("/all", authenticate, authorize, getBlogs);
router.patch("/update-publish/:id", authenticate, authorize, togglePublish);
router.get("/dashboard", authenticate, authorize, getDashboard);
router.get("/:id", authenticate, authorize, getBlog);
router.patch("/update/:id", authenticate, authorize, updateBlog);
router.delete("/:id", authenticate, authorize, deleteBlog);

export default router;
