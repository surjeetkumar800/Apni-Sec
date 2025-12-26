import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/UserController";

const router = Router();
const controller = new UserController();

// ================= PROFILE =================

// GET profile
router.get("/profile", authMiddleware, controller.getProfile);

// UPDATE profile
router.put("/profile", authMiddleware, controller.updateProfile);

export default router;
