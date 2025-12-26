"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const controller = new UserController_1.UserController();
// ================= PROFILE =================
// GET profile
router.get("/profile", authMiddleware_1.authMiddleware, controller.getProfile);
// UPDATE profile
router.put("/profile", authMiddleware_1.authMiddleware, controller.updateProfile);
exports.default = router;
