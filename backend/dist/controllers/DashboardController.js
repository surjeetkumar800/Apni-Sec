"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const IssueModel_1 = require("../models/IssueModel");
class DashboardController {
    async stats(req, res) {
        try {
            const userId = req.user.id;
            const baseFilter = {
                userId,
                isDeleted: false,
            };
            const totalIssues = await IssueModel_1.IssueModel.countDocuments(baseFilter);
            const openVulnerabilities = await IssueModel_1.IssueModel.countDocuments({
                ...baseFilter,
                status: "open",
            });
            const resolved = await IssueModel_1.IssueModel.countDocuments({
                ...baseFilter,
                status: "resolved",
            });
            return res.status(200).json({
                success: true,
                data: {
                    totalIssues,
                    openVulnerabilities,
                    resolved,
                },
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Failed to load dashboard stats",
            });
        }
    }
}
exports.DashboardController = DashboardController;
