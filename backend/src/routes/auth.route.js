import { Router } from "express";
import { login, logout } from "../controllers/admin.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/logout", authenticate, logout);

router.get("/verify", authenticate, (req, res) => {
  res.status(200).json({ success: true, message: "User is authenticated" });
});

export default router;
