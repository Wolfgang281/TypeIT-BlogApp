import { Router } from "express";
import {
  addComment,
  getBlogComments,
} from "../../controllers/user/comment.controller.js";

const router = Router();

router.post("/add/:id", addComment);
router.get("/:id", getBlogComments);

export default router;
