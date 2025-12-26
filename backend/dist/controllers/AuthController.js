"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    constructor() {
        this.service = new AuthService_1.AuthService();
        // ================= REGISTER =================
        this.register = async (req, res) => {
            try {
                const user = await this.service.register(req.body);
                return res.status(201).json({
                    success: true,
                    message: "User registered successfully",
                    data: user,
                });
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
        };
        // ================= LOGIN =================
        this.login = async (req, res) => {
            try {
                const result = await this.service.login(req.body.email, req.body.password);
                return res.status(200).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                return res.status(401).json({
                    success: false,
                    message: error.message,
                });
            }
        };
        // ================= FORGOT PASSWORD =================
        this.forgotPassword = async (req, res) => {
            try {
                const { email } = req.body;
                await this.service.forgotPassword(email);
                return res.status(200).json({
                    success: true,
                    message: "Password reset email sent",
                });
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
        };
        // ================= RESET PASSWORD =================
        this.resetPassword = async (req, res) => {
            try {
                const { token, password } = req.body;
                await this.service.resetPassword(token, password);
                return res.status(200).json({
                    success: true,
                    message: "Password reset successful",
                });
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
        };
    }
}
exports.AuthController = AuthController;
