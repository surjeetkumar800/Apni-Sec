"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const EmailService_1 = require("./EmailService");
class UserService {
    constructor() {
        this.repo = new UserRepository_1.UserRepository();
        this.emailService = new EmailService_1.EmailService();
    }
    // ================= GET PROFILE =================
    async getProfile(userId) {
        const user = await this.repo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };
    }
    // ================= UPDATE PROFILE =================
    async updateProfile(userId, data) {
        const user = await this.repo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // email duplicate check
        if (data.email && data.email !== user.email) {
            const exists = await this.repo.findByEmail(data.email);
            if (exists) {
                throw new Error("Email already in use");
            }
        }
        const updatedUser = await this.repo.update(userId, {
            name: data.name ?? user.name,
            email: data.email ?? user.email,
        });
        if (!updatedUser) {
            throw new Error("Profile update failed");
        }
        // 🔔 email notification (non-blocking)
        try {
            await this.emailService.sendProfileUpdatedEmail(updatedUser.email, updatedUser.name);
        }
        catch (err) {
            console.error("❌ Profile update email failed");
        }
        return {
            id: updatedUser._id.toString(),
            name: updatedUser.name,
            email: updatedUser.email,
        };
    }
}
exports.UserService = UserService;
