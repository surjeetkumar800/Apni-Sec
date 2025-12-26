"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IssueController_1 = require("../controllers/IssueController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// 🔐 All routes protected
router.use(authMiddleware_1.authMiddleware);
// CREATE ISSUE
router.post("/", IssueController_1.IssueController.create);
// LIST ISSUES
router.get("/", IssueController_1.IssueController.list);
// GET SINGLE ISSUE
router.get("/:id", IssueController_1.IssueController.get);
// UPDATE ISSUE
router.put("/:id", IssueController_1.IssueController.update);
// UPDATE STATUS
router.patch("/:id/status", IssueController_1.IssueController.updateStatus);
// SOFT DELETE ISSUE
router.delete("/:id", IssueController_1.IssueController.remove);
exports.default = router;
