import { Request, Response, RequestHandler } from "express";
import { IssueService } from "../services/IssueService";

const issueService = new IssueService();

/* helper to get user id safely */
const getUserId = (req: Request): string => {
  const user = (req as any).user;
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }
  return String(user.id);
};

export class IssueController {
  static create: RequestHandler = async (req, res) => {
    try {
      const issue = await issueService.createIssue(
        getUserId(req),
        req.body
      );

      res.status(201).json({
        success: true,
        data: issue,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  static list: RequestHandler = async (req, res) => {
    try {
      const issues = await issueService.listIssues(
        getUserId(req),
        req.query
      );

      res.json({
        success: true,
        data: issues,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  static get: RequestHandler = async (req, res) => {
    try {
      const issue = await issueService.getIssueById(
        req.params.id,
        getUserId(req)
      );

      res.json({
        success: true,
        data: issue,
      });
    } catch (err: any) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  };

  static update: RequestHandler = async (req, res) => {
    try {
      const issue = await issueService.updateIssue(
        req.params.id,
        getUserId(req),
        req.body
      );

      res.json({
        success: true,
        data: issue,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  static updateStatus: RequestHandler = async (req, res) => {
    try {
      const issue = await issueService.updateStatus(
        req.params.id,
        getUserId(req),
        req.body.status
      );

      res.json({
        success: true,
        data: issue,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  static remove: RequestHandler = async (req, res) => {
    try {
      const issue = await issueService.deleteIssue(
        req.params.id,
        getUserId(req)
      );

      res.json({
        success: true,
        data: issue,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
}
