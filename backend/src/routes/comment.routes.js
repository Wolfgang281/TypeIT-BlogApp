import { Router } from "express";
import { addComment, getBlogComments } from "../controllers/comment.controller";

const router = Router();

router.post("/add", addComment);
router.get("/comments/:id", getBlogComments);

export default router;
