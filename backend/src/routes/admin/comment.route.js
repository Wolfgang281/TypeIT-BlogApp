import { Router } from "express";
import {
  approveComment,
  deleteComment,
  getAllComments,
} from "../../controllers/admin/comment.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/all-comments", authenticate, authorize, getAllComments);
router.delete("/delete-comment/:id", authenticate, authorize, deleteComment);
router.patch("/approve-comment/:id", authenticate, authorize, approveComment);

export default router;
