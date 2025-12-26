"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const UserModel_1 = require("../models/UserModel");
class UserRepository {
    // ================= CREATE =================
    async create(data) {
        return UserModel_1.UserModel.create(data);
    }
    // ================= FIND BY EMAIL =================
    async findByEmail(email) {
        return UserModel_1.UserModel.findOne({ email }).select("+password");
    }
    // ================= FIND BY ID =================
    async findById(id) {
        return UserModel_1.UserModel.findById(id);
    }
    // ================= UPDATE USER =================
    async update(userId, data) {
        return UserModel_1.UserModel.findByIdAndUpdate(userId, { $set: data }, { new: true });
    }
    // ================= FIND BY RESET TOKEN =================
    async findByResetToken(token) {
        return UserModel_1.UserModel.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });
    }
}
exports.UserRepository = UserRepository;
