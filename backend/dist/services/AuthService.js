"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
const UserRepository_1 = require("../repositories/UserRepository");
const EmailService_1 = require("./EmailService");
class AuthService {
    constructor() {
        this.repo = new UserRepository_1.UserRepository();
        this.emailService = new EmailService_1.EmailService();
    }
    /* ================= TOKEN HELPER ================= */
    generateToken(userId) {
        const payload = { id: userId };
        const options = {
            expiresIn: env_1.env.JWT_EXPIRES_IN, // ✅ FIX
        };
        return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, options);
    }
    /* ================= REGISTER ================= */
    async register(data) {
        const { name, email, password } = data;
        const normalizedEmail = email.toLowerCase().trim();
        const exists = await this.repo.findByEmail(normalizedEmail);
        if (exists) {
            throw new Error("Email already registered");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await this.repo.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
        });
        const token = this.generateToken(user._id.toString());
        // 🔔 non-blocking welcome email
        this.emailService
            .sendWelcomeEmail(user.email, user.name)
            .catch(() => { });
        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            },
        };
    }
    /* ================= LOGIN ================= */
    async login(email, password) {
        const user = await this.repo.findByEmail(email.toLowerCase());
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            throw new Error("Invalid email or password");
        }
        const token = this.generateToken(user._id.toString());
        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            },
        };
    }
    /* ================= FORGOT PASSWORD ================= */
    async forgotPassword(email) {
        const user = await this.repo.findByEmail(email.toLowerCase());
        if (!user) {
            throw new Error("User not found");
        }
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        await this.repo.update(user._id.toString(), {
            resetToken,
            resetTokenExpiry: Date.now() + 15 * 60 * 1000, // 15 min
        });
        const resetLink = `${env_1.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        await this.emailService.sendPasswordResetEmail(user.email, user.name, resetLink);
        return { message: "Password reset email sent" };
    }
    /* ================= RESET PASSWORD ================= */
    async resetPassword(token, newPassword) {
        const user = await this.repo.findByResetToken(token);
        if (!user ||
            !user.resetTokenExpiry ||
            user.resetTokenExpiry < Date.now()) {
            throw new Error("Invalid or expired reset token");
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await this.repo.update(user._id.toString(), {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
        });
        return { message: "Password reset successful" };
    }
}
exports.AuthService = AuthService;
