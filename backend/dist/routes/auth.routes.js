"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
const c = new AuthController_1.AuthController();
// ================= AUTH =================
router.post("/register", c.register);
router.post("/login", c.login);
// ================= PASSWORD RESET =================
router.post("/forgot-password", c.forgotPassword);
router.post("/reset-password", c.resetPassword);
exports.default = router;
