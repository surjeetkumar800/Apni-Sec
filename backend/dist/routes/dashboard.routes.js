"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DashboardController_1 = require("../controllers/DashboardController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const controller = new DashboardController_1.DashboardController();
router.get("/stats", authMiddleware_1.authMiddleware, controller.stats);
exports.default = router;
