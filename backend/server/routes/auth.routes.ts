import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const c = new AuthController();

// ================= AUTH =================
router.post("/register", c.register);
router.post("/login", c.login);

// ================= PASSWORD RESET =================
router.post("/forgot-password", c.forgotPassword);
router.post("/reset-password", c.resetPassword);

export default router;
