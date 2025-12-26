"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueService = void 0;
const IssueRepository_1 = require("../repositories/IssueRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const EmailService_1 = require("./EmailService");
class IssueService {
    constructor() {
        this.repo = new IssueRepository_1.IssueRepository();
        this.userRepo = new UserRepository_1.UserRepository();
        this.emailService = new EmailService_1.EmailService();
    }
    // ================= CREATE ISSUE =================
    async createIssue(userId, data) {
        console.log("🟡 Creating issue for user:", userId);
        const issue = await this.repo.create({
            ...data,
            userId,
        });
        console.log("✅ Issue created:", issue._id.toString());
        // 🔥 ISSUE CREATE EMAIL (NON-BLOCKING)
        try {
            const user = await this.userRepo.findById(userId);
            if (user) {
                await this.emailService.sendIssueCreatedEmail(user.email, user.name, {
                    type: issue.type,
                    title: issue.title,
                    description: issue.description,
                });
                console.log("📧 Issue creation email sent to:", user.email);
            }
            else {
                console.warn("⚠️ User not found for issue email");
            }
        }
        catch (err) {
            console.error("❌ Issue email failed:", err.message);
            // ❗ email fail hone par API fail nahi hogi
        }
        return issue;
    }
    // ================= LIST ISSUES =================
    async listIssues(userId, query) {
        return this.repo.find({
            userId,
            type: query.type,
            status: query.status,
            search: query.search,
        });
    }
    // ================= GET SINGLE =================
    async getIssueById(issueId, userId) {
        const issue = (await this.repo.findById(issueId));
        if (!issue || issue.isDeleted) {
            throw new Error("Issue not found");
        }
        if (issue.userId.toString() !== userId) {
            throw new Error("Unauthorized access");
        }
        return issue;
    }
    // ================= UPDATE ISSUE =================
    async updateIssue(issueId, userId, data) {
        const issue = await this.getIssueById(issueId, userId);
        const updated = await this.repo.update(issueId, {
            title: data.title ?? issue.title,
            description: data.description ?? issue.description,
            priority: data.priority ?? issue.priority,
        });
        if (!updated) {
            throw new Error("Issue update failed");
        }
        return updated;
    }
    // ================= UPDATE STATUS =================
    async updateStatus(issueId, userId, status) {
        await this.getIssueById(issueId, userId);
        return this.repo.update(issueId, { status });
    }
    // ================= SOFT DELETE =================
    async deleteIssue(issueId, userId) {
        await this.getIssueById(issueId, userId);
        const deleted = await this.repo.update(issueId, {
            isDeleted: true,
        });
        if (!deleted) {
            throw new Error("Delete failed");
        }
        return deleted;
    }
}
exports.IssueService = IssueService;
