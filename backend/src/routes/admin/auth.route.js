import { Router } from "express";
import { login, logout } from "../../controllers/admin/auth.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", authenticate, logout);

export default router;
