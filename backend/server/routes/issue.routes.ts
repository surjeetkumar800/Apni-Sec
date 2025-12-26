import { Router } from "express";
import { IssueController } from "../controllers/IssueController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// 🔐 All routes protected
router.use(authMiddleware);

// CREATE ISSUE
router.post("/", IssueController.create);

// LIST ISSUES
router.get("/", IssueController.list);

// GET SINGLE ISSUE
router.get("/:id", IssueController.get);

// UPDATE ISSUE
router.put("/:id", IssueController.update);

// UPDATE STATUS
router.patch("/:id/status", IssueController.updateStatus);

// SOFT DELETE ISSUE
router.delete("/:id", IssueController.remove);

export default router;
