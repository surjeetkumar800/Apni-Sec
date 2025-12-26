"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        // ================= GET PROFILE =================
        // GET /api/users/profile
        this.getProfile = async (req, res) => {
            try {
                const user = req.user;
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorized",
                    });
                }
                const profile = await this.service.getProfile(user._id.toString());
                return res.status(200).json({
                    success: true,
                    data: profile,
                });
            }
            catch (error) {
                return res.status(404).json({
                    success: false,
                    message: error.message || "Failed to fetch profile",
                });
            }
        };
        // ================= UPDATE PROFILE =================
        // PUT /api/users/profile
        this.updateProfile = async (req, res) => {
            try {
                const user = req.user;
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorized",
                    });
                }
                const updatedProfile = await this.service.updateProfile(user._id.toString(), req.body);
                return res.status(200).json({
                    success: true,
                    message: "Profile updated successfully",
                    data: updatedProfile,
                });
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message || "Profile update failed",
                });
            }
        };
        this.service = new UserService_1.UserService();
    }
}
exports.UserController = UserController;
