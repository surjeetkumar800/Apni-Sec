"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueController = void 0;
const IssueService_1 = require("../services/IssueService");
const issueService = new IssueService_1.IssueService();
/* helper to get user id safely */
const getUserId = (req) => {
    const user = req.user;
    if (!user || !user.id) {
        throw new Error("Unauthorized");
    }
    return String(user.id);
};
class IssueController {
}
exports.IssueController = IssueController;
_a = IssueController;
IssueController.create = async (req, res) => {
    try {
        const issue = await issueService.createIssue(getUserId(req), req.body);
        res.status(201).json({
            success: true,
            data: issue,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
IssueController.list = async (req, res) => {
    try {
        const issues = await issueService.listIssues(getUserId(req), req.query);
        res.json({
            success: true,
            data: issues,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
IssueController.get = async (req, res) => {
    try {
        const issue = await issueService.getIssueById(req.params.id, getUserId(req));
        res.json({
            success: true,
            data: issue,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};
IssueController.update = async (req, res) => {
    try {
        const issue = await issueService.updateIssue(req.params.id, getUserId(req), req.body);
        res.json({
            success: true,
            data: issue,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
IssueController.updateStatus = async (req, res) => {
    try {
        const issue = await issueService.updateStatus(req.params.id, getUserId(req), req.body.status);
        res.json({
            success: true,
            data: issue,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
IssueController.remove = async (req, res) => {
    try {
        const issue = await issueService.deleteIssue(req.params.id, getUserId(req));
        res.json({
            success: true,
            data: issue,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
