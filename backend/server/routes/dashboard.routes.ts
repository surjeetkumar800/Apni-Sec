import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const controller = new DashboardController();

router.get("/stats", authMiddleware, controller.stats);

export default router;
