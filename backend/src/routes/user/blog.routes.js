import { Router } from "express";
import { getBlog, getBlogs } from "../../controllers/user/blog.controller.js";

const router = Router();

router.get("/all", getBlogs);

router.get("/:id", getBlog);

export default router;
